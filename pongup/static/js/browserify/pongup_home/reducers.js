import * as constants from '../pongup/constants'

const initialState = {
    active_tab: 'home',
    is_loading: true,
    username: '',
    user_profile: {}
 //    listings: [{
 //        img_url: '',
 //        listing_impressions: 0,
 //        listing_page_views: 0,
 //        listing_quote_requests: 0,
 //        plan_option: ''

 //    }],
 //    is_loading: true,
	// message_data: {},
	// proposals: []

}

const pongup_home_reducer = (state = initialState, action) => {
    // console.log('%cPongupHomeContainer componentDidMount', 'background-color:blue')
    console.log('%caction.type' + action.type, 'background-color:yellow')
    switch (action.type) {
        case constants.HOME_ACTIVE:
            console.log('HOME_ACTIVE')
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