import * as constants from '../pongup/constants'

const initialState = {
    active_tab: 'home',
    is_loading: true,
    username: '',
    user_profile: {}
}

const pongup_home_reducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.HOME_ACTIVE:
            return Object.assign({}, state, {
                // message_data: action.new_state.message_data,
                // is_loading: action.is_loading
                active_tab: action.active_tab
            })
        default:
            return state;
    }
}

export default pongup_home_reducer;