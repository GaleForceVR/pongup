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
	it('should work with an action', ()=>{
		let store = configureStore()

		const actions = [
			{type: constants.IS_MANAGER, is_manager: true}
		]

		actions.forEach(action => {store.dispatch(action)})

		const expected_manager_status = true
		const actual = store.getState().ladders_reducer.is_manager

		expect(actual).toEqual(expected_manager_status)
	})
})

describe('pongup store', ()=>{
	it('should work with an action', ()=>{
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