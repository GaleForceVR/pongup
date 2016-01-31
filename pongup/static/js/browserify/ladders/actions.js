import * as constants  from '../pongup/constants'
import axios from 'axios'
import { LaddersClient } from './ladders_client'

export function loadLadders() {

    // return (dispatch) => {
		

		return (dispatch) => {
			var client = new LaddersClient()
			client.fetch_ladders()
				.then( axios.spread( (ladders_data) => {
					dispatch({
						type: constants.LADDERS_ACTIVE,
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
						active_tab: 'ladders',
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