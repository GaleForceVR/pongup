import * as constants from '../pongup/constants'

const initialState = {
    active_tab: 'ladders',
    is_loading: true,
    user_profile: {},
    ladders: [],
    ladder_detail: [],
    matches_detail: [],
    errors: {},
    player_a_score: null,
    player_b_score: null,
    match_id: null,
    is_editing: false,
    liked: false,
    force_update: false

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
        case constants.LADDER_DETAIL_LOADED:
            return Object.assign({}, state, {
                ladder_detail: action.ladder_data.ladder_data,
                is_loading: false
            })
        case constants.MATCHES_DETAIL_LOADED:
            return Object.assign({}, state, {
                matches_detail: action.matches_data.matches_data,
                is_loading: false
            })
        case constants.VALIDATE:
            console.log('%cVALIDATE', 'background-color:pink')
            console.log(state)
            console.log(action.new_state)
            console.log(state.errors)
            var errors = Object.assign({}, state.errors, action.new_state.errors)
            console.log(errors)
            console.log(state.force_update)
            console.log(Object.assign({}, state, {
                errors: errors
            }))
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
        default:
            return state;
    }
}

export default ladders_reducer;