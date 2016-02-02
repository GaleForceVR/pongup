import * as constants from '../pongup/constants'

const initialState = {
    active_tab: 'login',
    is_loading: true,
    username: '',
    user_profile: {},
    is_staff: false,
    password: '',
    email: ''
}

const login_reducer = (state = initialState, action) => {
    // console.log('%cPongupHomeContainer componentDidMount', 'background-color:blue')
    console.log('%cLogin reducer', 'background-color:red')
    console.log('%caction.type' + action.type, 'background-color:yellow')
    console.log(action)
    switch (action.type) {
        case constants.LOGIN_ACTIVE:
            console.log('LOGIN_ACTIVE')
            return Object.assign({}, state, {
                // message_data: action.new_state.message_data,
                // is_loading: action.is_loading
                active_tab: action.active_tab
            })
        case constants.SAVE_STATE:
            return Object.assign({}, state, {
                username: action.username,
                is_staff: action.is_staff,
                password: action.password,
                email: action.email
            })
        default:
            return state;
    }
}

export default login_reducer;