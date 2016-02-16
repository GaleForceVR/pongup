import * as constants from '../pongup/constants'

const initialState = {
    active_tab: 'ladders',
    is_loading: true,
    user_profile: {},
    ladders: [],
    ladder_detail: []
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
            console.log('LADDER_DETAIL_LOADED')
            console.log(state)
            console.log(action)
            return Object.assign({}, state, {
                ladder_detail: action.ladder_data.ladder_data,
                is_loading: false
            })
        default:
            return state;
    }
}

export default ladders_reducer;