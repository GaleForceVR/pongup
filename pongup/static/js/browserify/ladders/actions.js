import * as constants  from '../pongup/constants'
import axios from 'axios'
import { LaddersClient } from './ladders_client'
import validator from 'validator'
import { getTheCookie } from '../login/login_client'

export function loadLadders() {
		return (dispatch) => {
			var client = new LaddersClient()
			client.fetch_ladders()
				.then( axios.spread( (ladders_data) => {
					dispatch({
						type: constants.LADDER_DATA_LOADED,
						ladder_data: {
							// user_info: user_info,
							ladders_data: ladders_data.data,
							// venues_and_events: venues_and_events.data,
							is_loading: false
						}
					})
				}))
				.then( () => {
					dispatch({
						type: constants.UPDATE_TAB,
						active_tab: 'ladders',
						is_loading: false
					})
				})
		}
}

export function loadLadderDetail(id) {
	return (dispatch, getState) => {
		var client = new LaddersClient()
		client.fetch_ladder_detail(id)
			.then( axios.spread( (ladder_data) => {
				var state = getState().ladders_reducer
				console.log('%cloadLadderDetail()', 'background-color:blue;color:yellow')
				console.log(ladder_data.data)
				console.log(state)
				dispatch({
					type: constants.LADDER_DETAIL_LOADED,
					ladder_data: {
						ladder_data: ladder_data.data,
						is_loading: false
					}

				})
			}))
			.then( () => {
				dispatch({
					type: constants.UPDATE_TAB,
					active_tab: 'ladder',
					is_loading: false
				})
			})
	}
}

export function submitJoinLadderRequest(current_ladder_id, current_user_id) {
	return(dispatch, getState) => {
		const state = getState().ladders_reducer

		console.log('submitJoinLadderRequest')
		console.log(state)

		const csrftoken = getTheCookie()
		const headers = {
			xsrfCookieName: 'csrftoken',
			xsrfHeaderName: 'X-CSRFToken',
			'X-CSRFToken': csrftoken
		}

		let params = {
			ladder_id: current_ladder_id,
			user_id: current_user_id
		}

		axios.post('/api/ladders/' + current_ladder_id + '/players/', params, headers)
			.then(function (response) {
				console.log('success')
				console.log(response)
			})
			.catch(function (response) {
				console.log('error')
				console.log(response)
			})
	}
}

export function createLadder(new_ladder_name, current_user_id) {
	console.log('new_ladder_name')
	console.log(new_ladder_name)
	console.log(current_user_id)
	return(dispatch, getState) => {
		// const state = getState().ladders_reducer

		// console.log('submitJoinLadderRequest')
		// console.log(state)

		const csrftoken = getTheCookie()
		const headers = {
			xsrfCookieName: 'csrftoken',
			xsrfHeaderName: 'X-CSRFToken',
			'X-CSRFToken': csrftoken
		}

		let params = {
			name: new_ladder_name,
			manager: current_user_id
		}

		axios.post('/api/ladders/', params , headers)
			.then(function (response) {
				console.log('success')
				console.log(response)
			})
			.catch(function (response) {
				console.log('error')
				console.log(response)
			})
	}
}

export function checkParticipation(current_username) {
	return (dispatch, getState) => {
		const state = getState().ladders_reducer
		console.log('%ccheckParticipation', 'background-color:yellow;color:red')
		console.log(state)
		for (var i = 0; i < state.ladder_detail.length; i++) {
			if (state.ladder_detail[i].user.username == current_username) {
				dispatch({
					type: constants.UPDATE_IS_IN_LADDER,
					is_in_ladder: true
				})
			}
		}
	}
}

export function loadMatchesDetail(id) {
	return (dispatch) => {
		var client = new LaddersClient()
		client.fetch_matches_detail(id)
			.then( axios.spread( (matches_data) => {
				dispatch({
					type: constants.MATCHES_DETAIL_LOADED,
					matches_data: {
						matches_data: matches_data.data,
						is_loading: false
					}

				})
			}))
	}
}

export function checkAllValidations(state) {
	return (dispatch, getState) => {
		// // var has_errors = false
		// console.log('run validations')
		// console.log(state)

		let new_state = Object.assign({}, getState().ladders_reducer, {errors: errors})
		dispatch({
			type: constants.VALIDATE,
			new_state
		})
	}
}

export function updateScore(new_score) {
	return (dispatch, getState) => {
		let new_state = Object.assign({}, getState().ladders_reducer, new_score)
		dispatch({
			type: constants.UPDATE_SCORE,
			new_state
		})
	}
}

export function submitScores(match_id, index) {
	return (dispatch, getState) => {
		var state = getState().ladders_reducer;

		let current_match
		for (var i = 0; i < state.matches_detail.length; i++) {
			if (state.matches_detail[i].id === match_id) {
				current_match = state.matches_detail[i]
			}
		}

		var err_data = state.errors[index]
		if (err_data.player_a_score || err_data.player_b_score) {
			console.log('%cerrors exist', 'background-color:red;color:white')
			let new_state = Object.assign({}, state, {errors: err_data.errors, focus_on_component: err_data.focus_on_component})
			dispatch({
				type: constants.VALIDATE,
				new_state
			})
		} else {
			console.log('%cno errors', 'background-color:green;color:white')
			var csrftoken = getTheCookie()
			var headers = {
				xsrfCookieName: 'csrftoken',
				xsrfHeaderName: 'X-CSRFToken',
				'X-CSRFToken': csrftoken
			}

			var params = {
				id: match_id,
				player_a_score: state.player_a_score[index],
				player_b_score: state.player_b_score[index],
				match_date: current_match.match_date 
			}

			axios.put('/api/match/' + match_id + '/', params, headers)
				.then(function (response) {
					console.log('success')
					console.log(response)
				})
				.catch(function (response) {
					console.log('error')
					console.log(response)
				})
		}
	}	
	
}

export function checkValidations(field, value = null, index, all = false) {
	return (dispatch, getState) => {
		var errors = getState().ladders_reducer.errors
		var val = value || null
		var temp_obj = {}

		switch (field) {
			case 'player_a_score':
				if (validator.isInt(val, {min: 0, max: 99})) {
					temp_obj = {player_a_score: undefined}
					var new_temp_obj = {}
					new_temp_obj[index] = temp_obj
					errors[index] = Object.assign({}, errors[index], temp_obj)
				} else {
					temp_obj = {player_a_score: 'Score must be a number between 0 and 99'}
					var new_temp_obj = {}
					new_temp_obj[index] = temp_obj
					errors[index] = Object.assign({}, errors[index], temp_obj)
				}
				break;
			case 'player_b_score':

				if (validator.isInt(val, {min: 0, max: 99})) {
					temp_obj = {player_b_score: undefined}
					var new_temp_obj = {}
					new_temp_obj[index] = temp_obj
					errors[index] = Object.assign({}, errors[index], temp_obj)
				} else {
					temp_obj = {player_b_score: 'Score must be a number between 0 and 99'}
					var new_temp_obj = {}
					new_temp_obj[index] = temp_obj
					errors[index] = Object.assign({}, errors[index], temp_obj)
				}
				break;
			default:
				break;
				
		}

		// var new_temp_obj = Object.assign({}, getState().ladders_reducer.errors[index], errors)

		let new_state = Object.assign({}, getState().ladders_reducer, {errors: errors})

		dispatch({
			type: constants.VALIDATE,
			new_state
		})

	}	
}

export function initEditMode() {
	return (dispatch) => {
		dispatch({
			type: constants.INIT_EDIT_MODE,
			is_editing: true
		})
	}
}

export function saveAndExitEditMode(new_props) {
	return(dispatch, getState) => {
		var new_state = Object.assign({}, getState().ladders_reducer, new_props)
		dispatch({
			type: constants.EXIT_EDIT_MODE,
			new_state
		})
	}

}
