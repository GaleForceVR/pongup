import * as constants from '../pongup/constants'

const initialState = {
    active_tab: 'ladders',
    is_loading: false,
    user_profile: {},
    ladders: []
}

const ladders_reducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.LADDERS_ACTIVE:
            return Object.assign({}, state, {
                // message_data: action.new_state.message_data,
                // is_loading: action.is_loading
                active_tab: action.active_tab
            })
        case constants.LADDER_DATA_LOADED:
            return Object.assign({}, state, {
                ladders: action.ladder_data.ladders_data,
                is_loading: false
            })
        default:
            return state;
    }
}

export default ladders_reducer;