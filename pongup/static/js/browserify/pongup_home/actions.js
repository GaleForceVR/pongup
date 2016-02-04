import * as constants  from '../pongup/constants'
import axios from 'axios'
import { PongupHomeClient } from './pongup_home_client'

export function loadPongupHome(params) {		

		return (dispatch) => {
			var client = new PongupHomeClient()
			client.fetch_user_data()
				.then( axios.spread( (user_profile) => {
					dispatch({
						type: constants.HOME_ACTIVE,
						user_data: {
							// user_info: user_info,
							username: user_profile.data,
							// venues_and_events: venues_and_events.data,
							is_loading: false
						}
					})
				}))
				.then( () => {
					dispatch({
						type: constants.UPDATE_TAB,
						active_tab: 'home',
						is_loading: false
					})
				})
		}
}