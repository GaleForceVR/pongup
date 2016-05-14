import * as constants  from '../pongup/constants'
import axios from 'axios'
import { LaddersClient } from './ladders_client'
import validator from 'validator'
import { getTheCookie } from '../login/login_client'
import { push } from 'react-router-redux'

export function loadLadders() {
		return (dispatch) => {
			var client = new LaddersClient()
			client.fetch_ladders()
				.then( axios.spread( (ladders_data) => {
					console.log(ladders_data)
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
	console.log('%cloadLadderDetail(id=' + id + ')', 'background-color:red;color:yellow')
	return (dispatch, getState) => {
		var client = new LaddersClient()
		client.fetch_ladder_detail(id)
			.then( axios.spread( (ladder_data) => {
				var state = getState().ladders_reducer
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

export function toggleEditRankings() {
	return (dispatch, getState) => {
		var state = getState().ladders_reducer
		dispatch({
			type: constants.IS_EDITING_RANKINGS,
			is_editing_rankings: !state.is_editing_rankings
		})
	}
}

export function setNewRankings(index, ladder_rank) {
	return (dispatch, getState) => {
		var state = getState().ladders_reducer
		console.log('setNewRankings()')
		console.log(index)
		console.log(ladder_rank)
		console.log(state)
		let rankings = state.new_rankings

		let updated_rank_obj = Object.assign({}, rankings[index], {
			ladder_rank: ladder_rank
		})

		console.log(rankings)
		console.log(updated_rank_obj)

		var new_rankings = [
			...rankings.slice(0, index),
			updated_rank_obj,
			...rankings.slice(index + 1)
		]

		console.log(new_rankings)

		dispatch({
			type: constants.SET_NEW_RANKINGS,
			new_rankings: new_rankings
		})

		// for (var i = 0; i < state.new_rankings.length )

		// dispatch(

		// )
	}
}

function triangular(num) {
	let sum = (num * (num + 1)) / 2
	console.log('triangular of ' + num)
	console.log(sum)
	return sum
}

function is_valid(rankings) {
	let sum_ranks = 0
	let are_ranks_valid = false
	console.log(rankings)

	let sorted_ranks = rankings.sort(function(a, b) { return a.b - b.b })
	console.log(sorted_ranks)

	for (var i = 0; i < sorted_ranks.length; i++) {
		sum_ranks = sum_ranks + parseInt(sorted_ranks[i].ladder_rank)
		if (i < sorted_ranks.length - 1) {
			if (sorted_ranks[i].ladder_rank == sorted_ranks[i + 1].ladder_rank ) {
				console.log('failed on duplicate check')
				return false
			}
		}
	}

	if (sum_ranks !== triangular(rankings.length)) {
		console.log('failed on triangular check')
		console.log('sum_ranks: ' + sum_ranks)
		console.log('triangular: ' + triangular(rankings.length))
		return false
	}

	return true
}

export function submitRankingUpdate(ladder_id) {
	console.log('submitRankingUpdate(ladder_id)')
	console.log(ladder_id)
	return (dispatch, getState) => {
		let state = getState().ladders_reducer
		const csrftoken = getTheCookie()
		let changes = 0

		const headers = {
			xsrfCookieName: 'csrftoken',
			xsrfHeaderName: 'X-CSRFToken',
			'X-CSRFToken': csrftoken
		}
		console.log('submitRankingUpdate()')
		console.log(state)
		const old_ranks = state.ladder_detail
		const new_ranks = state.new_rankings
		

		if (is_valid(new_ranks)) {
			for (var i = 0; i < old_ranks.length; i++) {
				if (old_ranks[i].ladder_rank !== new_ranks[i].ladder_rank && old_ranks[i].id == new_ranks[i].id) {

					let params = {
						id: new_ranks[i].id,
						ladder_rank: new_ranks[i].ladder_rank
					}

					changes++
					console.log('changes:')
					console.log(changes)
					console.log('params:')
					console.log(params)

					axios.put('/api/user/ladder/' + params.id + '/', params, headers)
						.then(function (response) {
							console.log('success')
							console.log(response)
						})
						.catch(function (response) {
							console.log('error')
							console.log(response)
						})
				}

				if (i == old_ranks.length - 1) {
					
					setTimeout(function() {
						console.log('get request')
						var client = new LaddersClient()
						client.fetch_ladder_detail(ladder_id)
							.then( axios.spread( (ladder_data) => {
								var state = getState().ladders_reducer
								console.log('ladder_data')
								console.log(ladder_data)
								dispatch({
									type: constants.LADDER_DETAIL_LOADED,
									ladder_data: {
										ladder_data: ladder_data.data,
										is_loading: false
									}

								})
							}))
							.catch(function (response) {
								console.log('error')
								console.log(response)
							})
					
					}, 1000)
				}
			}
		} else {
			console.log('error: invalid rankings')
		}


		// console.log('get request')
		// axios.get('/api/ladder/' + id)
		// 	.then( axios.spread( (ladder_data) => {
		// 		var state = getState().ladders_reducer
		// 		dispatch({
		// 			type: constants.LADDER_DETAIL_LOADED,
		// 			ladder_data: {
		// 				ladder_data: ladder_data.data,
		// 				is_loading: false
		// 			}

		// 		})
		// 	}))
		// 	.catch(function (response) {
		// 		console.log('error')
		// 		console.log(response)
		// 	})
			

		// if (changes > 0) {
		// 	loadLadderDetail(ladder_id, true)
		// }
	}
}

export function isManager() {
	return(dispatch) => {
		dispatch({
			type: constants.IS_MANAGER,
			is_manager: true
		})
	}
}

export function submitJoinLadderRequest(current_ladder_id, current_user_id) {
	return(dispatch, getState) => {
		const state = getState().ladders_reducer

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
				setTimeout(function() {
					console.log('get request')
					var client = new LaddersClient()
					client.fetch_ladder_detail(current_ladder_id)
						.then( axios.spread( (ladder_data) => {
							var state = getState().ladders_reducer
							console.log('ladder_data')
							console.log(ladder_data)
							dispatch({
								type: constants.LADDER_DETAIL_LOADED,
								ladder_data: {
									ladder_data: ladder_data.data,
									is_loading: false
								}

							})
						}))
						.catch(function (response) {
							console.log('error')
							console.log(response)
						})
				
				}, 500)

			})
			.catch(function (response) {
			})
	}
}

export function createLadder(new_ladder_name, current_user_id) {
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
				// dispatch(push('/ladder/' + response.data.id + '/matches/'))
				// setTimeout(function() {
					window.location.href = `/ladders/${response.data.id}/matches/`
				// }, 500)

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
			let new_state = Object.assign({}, state, {errors: err_data.errors, focus_on_component: err_data.focus_on_component})
			dispatch({
				type: constants.VALIDATE,
				new_state
			})
		} else {
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
			case 'ladder_rank':

				if (validator.isInt(val, {min: 0, max: 999})) {
					temp_obj = {ladder_rank: undefined}
					var new_temp_obj = {}
					new_temp_obj[index] = temp_obj
					errors[index] = Object.assign({}, errors[index], temp_obj)
				} else {
					temp_obj = {ladder_rank: 'Score must be a number between 0 and 999'}
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
