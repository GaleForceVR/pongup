import * as constants  from '../pongup/constants'
import axios from 'axios'
import { LoginClient } from './login_client'

export function loadUser() {

	return (dispatch) => {
		var client = new LoginClient()
		client.fetch_User()
			.then( axios.spread( (ladders_data) => {
				dispatch({
					type: constants.LOGIN_ACTIVE,
					ladder_data: {
						// user_info: user_info,
						ladders: ladders_data.data,
						// venues_and_events: venues_and_events.data,
						is_loading: false
					}
				})
			}))
			.then( () => {
				dispatch({
					type: constants.UPDATE_TAB,
					active_tab: 'login',
					is_loading: false
				})
			})
	}
}

export function saveToProps(new_props) {
	console.log('%csaveToProps', 'background-color:yellow;color:red')
	return (dispatch, getState) => {
		var new_state = Object.assign({}, getState().login_reducer, new_props)
		dispatch({
			type: constants.SAVE_STATE,
			new_state
		})
	}
}

export function createUser() {
	console.log('%ccreateUser', 'background-color:blue;color:yellow')
	return (dispatch, getState) => {
		var current_state = Object.assign({}, getState().login_reducer)
		console.log('current_state')
		console.log(current_state)
		var client = new LoginClient()
		client.create_user(current_state)
	}
}
