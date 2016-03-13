import * as constants  from '../pongup/constants'
import axios from 'axios'
import { LaddersClient } from './ladders_client'
import validator from 'validator'

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
	return (dispatch) => {
		var client = new LaddersClient()
		client.fetch_ladder_detail(id)
			.then( axios.spread( (ladder_data) => {
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
		// var has_errors = false
		console.log('run validations')
		console.log(state)

		let new_state = Object.assign({}, getState().ladders_reducer, {errors: errors})
		dispatch({
			type: constants.VALIDATE,
			new_state
		})
	}
}

export function submitScores() {
	return (dispatch, getState) => {
		var state = getState().ladders_reducer;

		// var err_data = checkAllValidations(state)
		console.log('submitScores()')
		console.log(state)
		console.log(state.errors)
		var err_data = state.errors
		if (err_data) {
			console.log('%cerrors exist', 'background-color:red;color:white')
			let new_state = Object.assign({}, state, {errors: err_data.errors, focus_on_component: err_data.focus_on_component})
			dispatch({
				type: constants.VALIDATE,
				new_state
			})
		} else {
			console.log('%cno errors', 'background-color:green;color:white')
		}
	}	
	
}

export function checkValidations(field, value = null, all = false) {
	return (dispatch, getState) => {
		var errors = getState().ladders_reducer.errors
		var val = value || null

		switch (field) {
			case 'player_a_score':
				
				if (validator.isInt(val, {min: 0, max: 99})) {
					Object.assign(errors, {player_a_score: null})
				} else {
					Object.assign(errors, {player_a_score: 'Score must be a number between 0 and 99'})
				}
				break;
			case 'player_b_score':

				if (validator.isInt(val, {min: 0, max: 99})) {
					Object.assign(errors, {player_b_score: null})
				} else {
					Object.assign(errors, {player_b_score: 'Score must be a number between 0 and 99'})
				}
				break;
			default:
				break;
				
		}

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
