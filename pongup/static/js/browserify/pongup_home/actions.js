import * as constants  from '../pongup/constants'
import axios from 'axios'
import { PongupHomeClient } from './pongup_home_client'

export function loadPongupHome(params) {

    // return (dispatch) => {
		

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
				// .then((venues_and_events) => {
				//     console.log(venues_and_events.data.venues.map(venue => venue.id).toString())
				//     client.fetch_unread_count({venues: venues_and_events.data.venues.map(venue => venue.id).toString()})
				//         .then((unread_count)=>{
				//             dispatch({
				//                 type: constants.UPDATE_UNREAD_ON_TAB,
				//                 unread_count: unread_count.data.o
				//             })
				//         })
				// })
		}



		// client.fetch_all_dashboard(params)
		// 	.then( axios.spread( (messages, unread_count) => {
		// 		dispatch({
		// 			type: constants.DASHBOARD_ACTIVE,
		// 			new_state: {
		// 				message_data: messages.data,
		// 				unread_count: unread_count.data
		// 			}
		// 		})
		// 	}))
		// 	.then( () => {
		// 		dispatch({
		// 			type: constants.UPDATE_TAB,
		// 			active_tab: 'dashboard',
		// 			is_loading: false
		// 		})
		// 	})
	// }
}