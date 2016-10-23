import 'babel-polyfill'
import expect from 'expect'
import * as actions from '../actions'
import * as constants from '../constants'

import * as pongup from '../reducers/pongup_reducer'
import pongup_reducer from '../reducers/pongup_reducer'

import * as ladders from '../../ladders/reducers'
import ladders_reducer from '../../ladders/reducers'

describe('empty', function(){
    it('tests working', function(){
        expect(true).toEqual(true)
    })
})

describe('pongup_reducer', () => {
	it('should return the initial state when action is undefined', () => {
        expect(pongup_reducer(pongup.initialState, {})).toEqual(pongup.initialState)
    })

    it('should handle UPDATE_LOCATION', () => {
		let state = pongup.initialState // {active_tab: 'home', is_loading: false, username: '', user_profile: {}, is_staff: false, password: '', email: '', current_user: null}
		let action = {type: constants.UPDATE_LOCATION, active_tab: 'july'}
		let actual = pongup_reducer(state, action)
		let expected = {active_tab: 'july', is_loading: false, username: '', user_profile: {}, is_staff: false, password: '', email: '', current_user: null}
		expect(actual).toEqual(expected)
    })

    it('should handle USER_DATA_LOADED', () => {
		let state = pongup.initialState
		let action = {type: constants.USER_DATA_LOADED, user_data: {username: [{username: 'galeforcevr', id: 1}], is_loading: true} }
		let actual = pongup_reducer(state, action)
		let expected = {active_tab: 'home', is_loading: true, username: 'galeforcevr', user_profile: {}, is_staff: false, password: '', email: '', current_user: 1}
		expect(actual).toEqual(expected)
    })
})

describe('ladders_reducer', () => {
	it('should return the initial state when action is undefined', () => {
        expect(ladders_reducer(ladders.initialState, {})).toEqual(ladders.initialState)
    })

    it('should handle LADDERS_ACTIVE', () => {
		let state = ladders.initialState // {active_tab: 'ladders', is_loading: true, user_profile: {}, ladders: [], ladder_detail: [], current_ladder: {}, matches_detail: [], errors: {}, player_a_score: {}, player_b_score: {}, match_id: null, is_editing: false, liked: false, force_update: false, is_in_ladder: false, is_manager: false, is_editing_rankings: false, new_rankings: []}
		let action = {type: constants.LADDERS_ACTIVE, is_loading: false, active_tab: 'not_ladders'}
		let actual = ladders_reducer(state, action)
		let expected = {active_tab: 'not_ladders', is_loading: false, user_profile: {}, ladders: [], ladder_detail: [], current_ladder: {}, matches_detail: [], errors: {}, player_a_score: {}, player_b_score: {}, match_id: null, is_editing: false, liked: false, force_update: false, is_in_ladder: false, is_manager: false, is_editing_rankings: false, new_rankings: []}
		expect(actual).toEqual(expected)
    })

  //   it('should handle USER_DATA_LOADED', () => {
		// let state = pongup.initialState
		// let action = {type: constants.USER_DATA_LOADED, user_data: {username: [{username: 'galeforcevr', id: 1}], is_loading: true} }
		// let actual = pongup_reducer(state, action)
		// let expected = {active_tab: 'home', is_loading: true, username: 'galeforcevr', user_profile: {}, is_staff: false, password: '', email: '', current_user: 1}
		// expect(actual).toEqual(expected)
  //   })
})


