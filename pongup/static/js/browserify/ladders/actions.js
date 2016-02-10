import * as constants  from '../pongup/constants'
import axios from 'axios'
import { LaddersClient } from './ladders_client'

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