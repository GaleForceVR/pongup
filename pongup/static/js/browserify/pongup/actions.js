import * as constants  from './constants'
import axios from 'axios'
import { PongupClient } from './pongup_client'
// import { updatePath } from 'redux-simple-router'
import { updatePath } from 'react-router-redux'

export function loadUserData() {

    return (dispatch) => {
        var client = new PongupClient()
        client.fetch_user_data()
            .then( axios.spread( (user_profile) => {
                dispatch({
                    type: constants.USER_DATA_LOADED,
                    user_data: {
                        // user_info: user_info,
                        username: user_profile.data,
                        // venues_and_events: venues_and_events.data,
                        is_loading: false
                    }
                })
                
            }))
    }
}

export function handleTabSelect(tab) {
    return (dispatch) => {
        dispatch({type: constants.UPDATE_TAB, active_tab: tab})
        if (tab !== 'home') {
            dispatch(updatePath('/' + tab))
        } else {
            dispatch(updatePath('/'))
        }
    }
}





// Possible way of doing things

// import * as constants  from './constants'
// import { updatePath } from 'redux-simple-router'
// import { ControlPanelClient } from './control_panel_client'


// function data_loaded(new_state, tab, dispatch) {
//  console.log('calling')
//  switch (tab){
//      case 'dashboard':
//          return dispatch({
//              type: constants.DASHBOARD_ACTIVE,
//              new_state: new_state
//          })
//      case 'inbox':
//      console.log(new_state)
//          return dispatch({
//              type: constants.INBOX_ACTIVE,
//              new_state: new_state
//          })
//      default:
//          return console.log('actions default')
//  }

// }

// export function handleTabSelect(tab, req_params) {
//  console.log('handle')
//     var client = new ControlPanelClient()
//     return (dispatch) => {
//      dispatch({type: constants.UPDATE_TAB, active_tab: tab, is_loading: true})
//      client.fetch_tab_data(tab, req_params)
//          .then(response => console.log())
//          .then(response => data_loaded(response.data, tab, dispatch))
//          .then( () => dispatch(updatePath('/messages/control-panel/' + tab)) )
//          .then( () => dispatch({type: constants.UPDATE_TAB, active_tab: tab, is_loading: false}) )
//     }
// }