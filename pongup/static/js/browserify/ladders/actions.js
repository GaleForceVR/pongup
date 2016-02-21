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
	console.log('loadLadderDetail: ' + id)
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
	console.log('%cloadMatchesDetail()', 'background-color:red;color:yellow')
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

export function checkValidations(field, value = null, all = false) {
	return (dispatch, getState) => {
		var errors = getState().ladders_reducer.errors

		switch (field) {
			case 'player_a_score':
				var val = value || null

				if (validator.isInt(val, {min: 0, max: 99})) {
					console.log('player_a_score: null')
					Object.assign(errors, {player_a_score: null})
				} else {
					console.log('player_a_score: error message')
					Object.assign(errors, {player_a_score: 'Score must be a number between 0 and 99'})
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
