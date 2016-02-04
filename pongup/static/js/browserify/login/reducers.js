import * as constants from '../pongup/constants'

const initialState = {
    active_tab: 'login',
    is_loading: true,
    new_user: {
        username: '',
        is_staff: false,
        password: '',
        email: ''
    }
    
}

const login_reducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.LOGIN_ACTIVE:
            return Object.assign({}, state, {
                // message_data: action.new_state.message_data,
                // is_loading: action.is_loading
                active_tab: action.active_tab
            })
        case constants.SAVE_STATE:
            console.log('SAVE_STATE')
            console.log(action)
            // console.log(action.username)
            console.log(action.new_props)
            console.log(state)
            return Object.assign({}, state, action.new_props)
        default:
            return state;
    }
}

export default login_reducer;