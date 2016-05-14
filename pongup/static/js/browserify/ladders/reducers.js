import * as constants from '../pongup/constants'

const initialState = {
    active_tab: 'ladders',
    is_loading: true,
    user_profile: {},
    ladders: [],
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
    is_manager: false,
    is_editing_rankings: false,
    new_rankings: []
}

const ladders_reducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.LADDERS_ACTIVE:
            return Object.assign({}, state, {
                // message_data: action.new_state.message_data,
                is_loading: action.is_loading,
                active_tab: action.active_tab
            })
        case constants.LADDER_DATA_LOADED:
            return Object.assign({}, state, {
                ladders: action.ladder_data.ladders_data,
                is_loading: false
            })
        case constants.SET_CURRENT_LADDER:
            console.log('SET_CURRENT_LADDER')
            console.log(action)
            return Object.assign({}, state, {
                current_ladder: action.current_ladder
            })
        case constants.LADDER_DETAIL_LOADED:
            console.log('LADDER_DETAIL_LOADED')
            console.log(action.ladder_data.ladder_data)
            return Object.assign({}, state, {
                ladder_detail: action.ladder_data.ladder_data,
                new_rankings: action.ladder_data.ladder_data,
                current_ladder: action.current_ladder,
                is_loading: false
            })
        case constants.MATCHES_DETAIL_LOADED:
            return Object.assign({}, state, {
                matches_detail: action.matches_data.matches_data,
                is_loading: false
            })
        case constants.IS_MANAGER:
            return Object.assign({}, state, {
                is_manager: action.is_manager
            })
        case constants.VALIDATE:
            var errors = Object.assign({}, state.errors, action.new_state.errors)
            return Object.assign({}, state, {
                errors: errors
            },{force_update: !state.force_update})
        case constants.INIT_EDIT_MODE:
            return Object.assign({}, state,
                action.new_state
            )
        case constants.EXIT_EDIT_MODE:
            return Object.assign({}, state,
                action.new_state
            )
        case constants.UPDATE_SCORE:
            return Object.assign({}, state,
                action.new_state
            )
        case constants.UPDATE_IS_IN_LADDER:
            return Object.assign({}, state, {
                is_in_ladder: action.is_in_ladder
            })
        case constants.IS_EDITING_RANKINGS:
            return Object.assign({}, state, {
                is_editing_rankings: action.is_editing_rankings
            })
        case constants.SET_NEW_RANKINGS:
            return Object.assign({}, state, {
                new_rankings: action.new_rankings
            })
        default:
            return state;
    }
}

export default ladders_reducer;