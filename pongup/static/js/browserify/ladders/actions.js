import * as constants  from '../pongup/constants'
import axios from 'axios'
import { LaddersClient } from './ladders_client'
import validator from 'validator'
import { getTheCookie } from '../login/login_client'
import { push } from 'react-router-redux'
import moment from 'moment'

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
	console.log('setNewRankings')
	console.log(typeof(index))
	console.log('index: ' + index)
	console.log(typeof(ladder_rank))
	console.log('ladder_rank: ' + ladder_rank)
	return (dispatch, getState) => {

		console.log('setNewRankings - state')
		console.log(state)
		var state = getState().ladders_reducer
		let rankings = state.new_rankings

		let updated_rank_obj = Object.assign({}, rankings[index], {
			ladder_rank: ladder_rank
		})

		var new_rankings = [
			...rankings.slice(0, index),
			updated_rank_obj,
			...rankings.slice(index + 1)
		]

		console.log('new_rankings')
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
	return sum
}

function is_valid(rankings) {
	let sum_ranks = 0
	let are_ranks_valid = false
	let unapproved_players = 0

	let sorted_ranks = rankings.sort(function(a, b) { return a.b - b.b })

	for (var i = 0; i < sorted_ranks.length; i++) {
		if (!sorted_ranks[i].approved) {
			unapproved_players = unapproved_players + 1
		} else if (i < sorted_ranks.length - 1) {
			sum_ranks = sum_ranks + parseInt(sorted_ranks[i].ladder_rank)
			if (sorted_ranks[i].ladder_rank == sorted_ranks[i + 1].ladder_rank) {
				return false
			}
		} else {
			sum_ranks = sum_ranks + parseInt(sorted_ranks[i].ladder_rank)
		}
	}

	if (sum_ranks !== triangular(rankings.length - unapproved_players)) {
		return false
	}

	return true
}

export function submitRankingUpdate(ladder_id, challenge_old_ranks=null) {
	return (dispatch, getState) => {
		let state = getState().ladders_reducer
		const csrftoken = getTheCookie()
		let changes = 0

		const headers = {
			xsrfCookieName: 'csrftoken',
			xsrfHeaderName: 'X-CSRFToken',
			'X-CSRFToken': csrftoken
		}
		let old_ranks = state.ladder_detail
		let new_ranks = state.new_rankings
		
		if (challenge_old_ranks) {
			console.log('challenge_ranks exist')
			old_ranks = challenge_old_ranks
			// new_ranks = challenge_new_ranks
		} else {
			console.log('NO challenge_ranks')
		}

		console.log('new_ranks')
		console.log(new_ranks)

		if (challenge_old_ranks || is_valid(new_ranks)) {
			for (var i = 0; i < old_ranks.length; i++) {
				if (old_ranks[i].approved && old_ranks[i].ladder_rank !== new_ranks[i].ladder_rank && old_ranks[i].id == new_ranks[i].id) {

					let params = {
						id: new_ranks[i].id,
						ladder_rank: new_ranks[i].ladder_rank
					}

					changes++

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
						var client = new LaddersClient()
						client.fetch_ladder_detail(ladder_id)
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
	}
}

export function approvePlayer(user_ladder_id, ladder_id) {
	return (dispatch, getState) => {
		let state = getState().ladders_reducer
		const csrftoken = getTheCookie()

		const headers = {
			xsrfCookieName: 'csrftoken',
			xsrfHeaderName: 'X-CSRFToken',
			'X-CSRFToken': csrftoken
		}

		let params = {
			approved: true
		}

		axios.put('/api/user/ladder/' + user_ladder_id + '/', params, headers)
			.then(function (response) {
				var client = new LaddersClient()
					client.fetch_ladder_detail(ladder_id)
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
						.catch(function (response) {
							console.log('error')
							console.log(response)
						})
			})
			.catch(function (response) {
				console.log('error')
				console.log(response)
			})
				

				// if (i == old_ranks.length - 1) {
					
				// 	setTimeout(function() {
				// 		console.log('get request')
				// 		var client = new LaddersClient()
				// 		client.fetch_ladder_detail(ladder_id)
				// 			.then( axios.spread( (ladder_data) => {
				// 				var state = getState().ladders_reducer
				// 				console.log('ladder_data')
				// 				console.log(ladder_data)
				// 				dispatch({
				// 					type: constants.LADDER_DETAIL_LOADED,
				// 					ladder_data: {
				// 						ladder_data: ladder_data.data,
				// 						is_loading: false
				// 					}

				// 				})
				// 			}))
				// 			.catch(function (response) {
				// 				console.log('error')
				// 				console.log(response)
				// 			})
					
				// 	}, 1000)
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
					var client = new LaddersClient()
					client.fetch_ladder_detail(current_ladder_id)
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

export function createLadder(new_ladder_name, current_user_id, new_ladder_location, new_ladder_start_date, new_ladder_end_date) {
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
			manager: current_user_id,
			location: new_ladder_location,
			start_date: new_ladder_start_date,
			end_date: new_ladder_end_date
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

export function updateMatchDate(unformatted_match_date, match_time) {
	let match_date = unformatted_match_date.format('M/D/YYYY')

	// this.state = {
	//   show_date_picker: false,
	//   current_time: moment().subtract(1, 'h').subtract(3,'m').format('h:mm a'),
	//   current_date: moment().format('M/D/YYYY')
	// }

	let match_datetime = match_date + ' ' + match_time
	match_datetime = moment(match_datetime, 'M/D/YYYY hh:mm a')
}

export function scheduleMatch(date_obj, hour, min, period, champion_name, challenger_name, champion_rank, challenger_rank, ladder_id, is_challenge_match) {
	let date = date_obj.format('M/D/YYYY')
	let match_datetime = date + ' ' + hour + ':' + min + ' ' + period
	match_datetime = moment(match_datetime, 'M/D/YYYY hh:mm a')

	// let is_challenge_match = (challenger_rank - champion_rank < 3) ? true : false



	return (dispatch, getState) => {
		let state = getState().ladders_reducer

		let csrftoken = getTheCookie()
		let headers = {
			xsrfCookieName: 'csrftoken',
			xsrfHeaderName: 'X-CSRFToken',
			'X-CSRFToken': csrftoken
		}

		let params = {
			player_a: champion_name,
			player_b: challenger_name,
			match_date: match_datetime,
			is_challenge_match: is_challenge_match,
			ladder: ladder_id
		}

		axios.post('/api/match/', params, headers)
			.then(function (response) {
				console.log('success')
				console.log(response)
				var client = new LaddersClient()
				client.fetch_matches_detail(ladder_id)
					.then( axios.spread( (matches_data) => {
						dispatch({
							type: constants.MATCHES_DETAIL_LOADED,
							matches_data: {
								matches_data: matches_data.data,
								is_loading: false
							}

						})
					}))
			})
			.catch(function (response) {
				console.log('error')
				console.log(response)
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

export function rescheduleMatch(date_obj, hour, min, period, match_id, orig_date, ladder_id) {
	let date = date_obj.format('M/D/YYYY')
	let match_datetime = date + ' ' + hour + ':' + min + ' ' + period
	match_datetime = moment(match_datetime, 'M/D/YYYY hh:mm a')

	return (dispatch, getState) => {
		var csrftoken = getTheCookie()
		var headers = {
			xsrfCookieName: 'csrftoken',
			xsrfHeaderName: 'X-CSRFToken',
			'X-CSRFToken': csrftoken
		}

		var params = {
			id: match_id,
			// player_a_score: state.player_a_score[index],
			// player_b_score: state.player_b_score[index],
			match_date: match_datetime, 
			alternate_date: orig_date
		}

		axios.put('/api/match/' + match_id + '/', params, headers)
			.then(function (response) {
				console.log('success')
				console.log(response)
				var client = new LaddersClient()
				client.fetch_matches_detail(ladder_id)
					.then( axios.spread( (matches_data) => {
						dispatch({
							type: constants.MATCHES_DETAIL_LOADED,
							matches_data: {
								matches_data: matches_data.data,
								is_loading: false
							}

						})
					}))
			})
			.catch(function (response) {
				console.log('error')
				console.log(response)
			})
	}
}

export function acceptChallenge(match_id, match_date, ladder_id) {
	return (dispatch, getState) => {
		var csrftoken = getTheCookie()
		var headers = {
			xsrfCookieName: 'csrftoken',
			xsrfHeaderName: 'X-CSRFToken',
			'X-CSRFToken': csrftoken
		}

		var params = {
			id: match_id,
			accepted: true,
			match_date: match_date
		}

		axios.put('/api/match/' + match_id + '/', params, headers)
			.then(function (response) {
				console.log('success')
				console.log(response)
				var client = new LaddersClient()
				client.fetch_matches_detail(ladder_id)
					.then( axios.spread( (matches_data) => {
						dispatch({
							type: constants.MATCHES_DETAIL_LOADED,
							matches_data: {
								matches_data: matches_data.data,
								is_loading: false
							}

						})
					}))
			})
			.catch(function (response) {
				console.log('error')
				console.log(response)
			})
	}
}

export function submitScores(match, index, ladder_id=null) {
	return (dispatch, getState) => {
		var state = getState().ladders_reducer;



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
				id: match.id,
				player_a_score: state.player_a_score[index],
				player_b_score: state.player_b_score[index],
				match_date: match.match_date,
				completion_date: moment()
			}

	// COMMENT BACK IN to actually submit scores

			axios.put('/api/match/' + match.id + '/', params, headers)
				.then(function (response) {
					console.log('success')
					console.log(response)
					var client = new LaddersClient()
					client.fetch_matches_detail(ladder_id)
						.then( axios.spread( (matches_data) => {
							dispatch({
								type: constants.MATCHES_DETAIL_LOADED,
								matches_data: {
									matches_data: matches_data.data,
									is_loading: false
								}

							})
						}))
				})
				.catch(function (response) {
					console.log('error')
					console.log(response)
				})

			if (match.is_challenge_match) {
				var client = new LaddersClient()
				client.fetch_ladder_detail(ladder_id)
					.then( axios.spread( (ladder_data) => {
						const current_rank_list = ladder_data.data

						let winner = null
						let old_winner_rank = null
						let old_winner_rank_index = null
						let new_winner_rank = null

						let loser = null
						let old_loser_rank = null
						let old_loser_rank_index = null
						let new_loser_rank = null

						if (parseInt(state.player_a_score[index]) > parseInt(state.player_b_score[index])) {
							winner = match.player_a
							loser = match.player_b
						} else {
							winner = match.player_b
							loser = match.player_a
						}

						for (var i = 0; i < current_rank_list.length; i++) {
							if (current_rank_list[i].user.username == winner.username) {
								old_winner_rank = current_rank_list[i].ladder_rank
								old_winner_rank_index = i
							} else if (current_rank_list[i].user.username == loser.username) {
								old_loser_rank = current_rank_list[i].ladder_rank
								old_loser_rank_index = i
							}
						}

						if (old_winner_rank > old_loser_rank) {
							
							new_winner_rank = old_loser_rank
							new_loser_rank = old_loser_rank + 1

							if (old_winner_rank - old_loser_rank > 1) {
								for (var i = old_loser_rank_index + 1; i < old_winner_rank_index; i++) {
									dispatch(setNewRankings(i, (parseInt(current_rank_list[i].ladder_rank) + 1).toString()))
								}
							}

							dispatch(setNewRankings(old_winner_rank_index, new_winner_rank.toString())) // player_a
							dispatch(setNewRankings(old_loser_rank_index, new_loser_rank.toString())) // player_b
							dispatch(submitRankingUpdate(ladder_id, current_rank_list))
						}

						


						// var state = getState().ladders_reducer
						// dispatch({
						// 	type: constants.LADDER_DETAIL_LOADED,
						// 	ladder_data: {
						// 		ladder_data: ladder_data.data,
						// 		is_loading: false
						// 	}

						// })
					}))
					// .then( () => {
					// 	dispatch({
					// 		type: constants.UPDATE_TAB,
					// 		active_tab: 'ladder',
					// 		is_loading: false
					// 	})
					// })
			}
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
