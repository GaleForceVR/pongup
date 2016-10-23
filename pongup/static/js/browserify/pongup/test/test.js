// var assert = require('assert');
// describe('Array', function() {
// 	describe('#indexOf()', function() {
// 		it('should return -1 when the value is not present', function() {
// 			assert.equal(-1, [1,2,3].indexOf(4));
// 		});
// 	});
// });

import 'babel-polyfill'
import expect from 'expect'
import * as constants from '../constants'
import configureStore from '../store'

// require('babel-polyfill')
// require('babel-preset-es2015')
// require('expect')
// var constants = require('../constants')
// var configureStore = require('../store')

describe('pongup store', ()=>{
	it('should work with a series of actions sent to the ladders_reducer', ()=>{
		let store = configureStore()

		const actions = [
			{type: constants.LADDER_DATA_LOADED, ladder_data: { ladders_data: ['ladders_test_data']}},
			{type: constants.LADDERS_ACTIVE, is_loading: true, active_tab: 'ladders_test'},
			{type: constants.IS_MANAGER, is_manager: true}
		]

		actions.forEach(action => {store.dispatch(action)})

		const expected_state = {
			active_tab: 'ladders_test',
			is_loading: true,
			user_profile: {},
			ladders: ['ladders_test_data'],
			ladder_detail: [],
			current_ladder: {},
			matches_detail: [],
			errors: {},
			player_a_score: {},
			player_b_score: {},
			match_id: null,
			is_editing: false,
			liked: false,
			force_update: false,
			is_in_ladder: false,
			is_manager: true,
			is_editing_rankings: false,
			new_rankings: []
		}
		const actual = store.getState().ladders_reducer

		expect(actual).toEqual(expected_state)
	})

	it('should work with a series of actions sent to the pongup_reducer', ()=>{
		let store = configureStore()

		const actions = [
			{type: constants.USER_DATA_LOADED, user_data: {username: [{username: 'galeforcevr', id: 1}], is_loading: false}}
		]

		actions.forEach(action => {store.dispatch(action)})
		const expected_user = 'galeforcevr'

		// console.log('what?')
		// console.log(store)
		// console.log(store.getState())
		// console.log(store.getState().pongup_reducer)
		const actual = store.getState().pongup_reducer.username
		expect(actual).toEqual(expected_user)
	})
})
