import * as constants from '../constants'

const initialState = {
    active_tab: 'home',
    is_loading: false,
    username: '',
    user_profile: {},
    is_staff: false,
    password: '',
    email: '',
    current_user: null
    // ladders: {}
}


const pongup_reducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.UPDATE_LOCATION:
            return Object.assign({}, state, {
                active_tab: action.active_tab
            })
        case constants.USER_DATA_LOADED:
            console.log('%cUSER_DATA_LOADED', 'background-color:red;color:yellow')
            console.log(action.user_data)
            return Object.assign({}, state, {
                username: action.user_data.username[0].username,
                current_user: action.user_data.username[0].id,
                // user_profile: action.user_data.user_profile,
                // venues_and_events: action.user_data.venues_and_events,
                is_loading: action.user_data.is_loading
            })
        // case constants.LADDER_DATA_LOADED:
        //     console.log('LADDER_DATA_LOADED')
        //     console.log(action)
        //     console.log(action.ladder_data.ladders_data)
        //     return Object.assign({}, state, {
        //         ladders: action.ladder_data.ladders_data,
        //         is_loading: false
        //     })
        // case constants.UPDATE_UNREAD_ON_TAB:
        //     return Object.assign({}, state, {
        //         unread_count: action.unread_count
        //     })
        default:
            return state;
    }
}

export default pongup_reducer;
