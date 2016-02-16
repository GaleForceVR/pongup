import * as constants  from '../pongup/constants'
import axios from 'axios'
import { LaddersClient } from './ladders_client'

export function loadLadders() {
		var self = this
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
				.then( () => {
					dispatch({
						type: constants.SET_OPEN_STATES
					})
				})
		}
}

export function setOpenStates() {
	console.log('%csetOpenStates', 'background-color:orange')
}

export function createOpenState(key, is_open, open_arr, selfy) {
	return (dispatch) => {
		dispatch({
			type: constants.CREATE_OPEN_STATE,
			selfy: selfy,
			arr: open_arr,
			index: key,
			open: is_open
		})
	}
}

export function updateOpenState(key, is_open) {
	return (dispatch) => {
		dispatch({
			type: constants.UPDATE_OPEN_STATE,
			index: key,
			open: is_open
		})
	}
}

export function increment() {
	return(dispatch) => {
		dispatch({
			type: constants.INCREMENT
		})
	}
}

export function decrement() {
	return(dispatch) => {
		dispatch({
			type: constants.DECREMENT
		})
	}
}

export function addCounter() {
	return(dispatch) => {
		dispatch({
			type: constants.ADD_COUNTER
		})
	}
}

export function removeCounter(index) {
	return(dispatch) => {
		dispatch({
			type: constants.REMOVE_COUNTER,
			index: index
		})
	}
}

export function incrementCounter(index) {
	return(dispatch) => {
		dispatch({
			type: constants.INCREMENT_COUNTER,
			index: index
		})
	}
}

export function decrementCounter(index) {
	return(dispatch) => {
		dispatch({
			type: constants.DECREMENT_COUNTER,
			index: index
		})
	}
}

