import 'babel-polyfill'

// imported modules and libraries
import { createHistory } from 'history'
import { hashHistory } from 'react-router'
// import { syncHistory } from 'redux-simple-router'
import { syncHistoryToStore } from 'redux-simple-router'
// import { browserHistory } from 'react-router'

import { connect, Provider } from 'react-redux'
import configureStore from './store'
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import { syncReduxAndRouter } from 'redux-simple-router'

import ReactDom from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { syncHistory, routeReducer } from 'react-router-redux'

// import all_reducers from 'reducers/index.js'

// const reducer = combineReducers(Object.assign({}, all_reducers, {
//     routing: routeReducer
// }))

// imported components

import { AppContainer } from './components/AppContainer'
import { LaddersContainer } from '../ladders/components/LaddersContainer'
import { LaddersIndexContainer } from '../ladders/components/LaddersIndexContainer'
import { PongupHomeContainer } from '../pongup_home/components/PongupHomeContainer'
import { LoginContainer } from '../login/components/LoginContainer'
import { LadderDetailContainer } from '../ladders/components/LadderDetailContainer'
import { MyLaddersContainer } from '../ladders/components/MyLaddersContainer'

function mapAppContainerStateToProps(state) {
    return {
        active_app: state.pongup_reducer.active_tab,
        is_loading: state.pongup_reducer.is_loading,
        username: state.pongup_reducer.username,
        user_profile: state.pongup_reducer.user_profile,
        is_staff: state.pongup_reducer.is_staff,
        password: state.pongup_reducer.password,
        email: state.pongup_reducer.email
        // ladders: state.ladders_reducer.ladders
    };
}

function mapPongupHomeContainerStateToProps(state) {
    return {
        // active_app: state.pongup_reducer.active_tab
        active_app: state.pongup_home_reducer.active_tab,
        is_loading: state.pongup_home_reducer.is_loading,
        username: state.pongup_reducer.username,
        user_profile: state.pongup_home_reducer.user_profile,
        is_staff: state.pongup_home_reducer.is_staff,
        password: state.pongup_home_reducer.password,
        email: state.pongup_home_reducer.email
    };
}

function mapLaddersContainerStateToProps(state) {
    return {
        // active_app: state.pongup_reducer.active_tab
        is_loading: state.ladders_reducer.is_loading,
        active_app: state.ladders_reducer.active_tab,
        ladders: state.ladders_reducer.ladders,
        username: state.pongup_reducer.username
    };
}

function mapLaddersIndexContainerStateToProps(state) {
    return {
        active_app: state.ladders_reducer.active_tab,
        ladders: state.ladders_reducer.ladders,
        username: state.pongup_reducer.username
    }
}

function mapLadderDetailContainerStateToProps(state) {
    return {
        is_loading: state.ladders_reducer.is_loading,
        active_app: state.ladders_reducer.active_tab,
        ladders: state.ladders_reducer.ladders,
        username: state.pongup_reducer.username,
        ladder_detail: state.ladders_reducer.ladder_detail,
        matches_detail: state.ladders_reducer.matches_detail,
        errors: state.ladders_reducer.errors,
        player_a_score: state.ladders_reducer.player_a_score,
        is_editing: state.ladders_reducer.is_editing,
        liked: state.ladders_reducer.liked,
        force_update: state.ladders_reducer.force_update
    }
}

function mapMyLaddersContainerStateToProps(state) {
    return {
        is_loading: state.ladders_reducer.is_loading,
        active_app: state.ladders_reducer.active_tab,
        ladders: state.ladders_reducer.ladders,
        username: state.pongup_reducer.username,
        ladder_detail: state.ladders_reducer.ladder_detail
    }
}

// function mapLoginContainerStateToProps(state) {
//     return {
//         // active_app: state.pongup_reducer.active_tab
//         active_app: state.login_reducer.active_tab,
//         is_loading: state.login_reducer.is_loading,
//         new_user: state.login_reducer.new_user,
//         login_info: state.login_reducer.login_info

//         // username: state.pongup_reducer.username,
//         // is_staff: state.login_reducer.is_staff,
//         // password: state.login_reducer.password,
//         // email: state.login_reducer.email
//     };
// }

export function init() {
    const store = configureStore();
    // send dispatch() as a prop down to the components...
    
    var ConnectedAppContainer = connect(mapAppContainerStateToProps)(AppContainer)
    var ConnectedPongupHomeContainer = connect(mapPongupHomeContainerStateToProps)(PongupHomeContainer)
    var ConnectedLaddersContainer = connect(mapLaddersContainerStateToProps)(LaddersContainer)
    var ConnectedLadderDetailContainer = connect(mapLadderDetailContainerStateToProps)(LadderDetailContainer)
    var ConnectedMyLaddersContainer = connect(mapMyLaddersContainerStateToProps)(MyLaddersContainer)
    var ConnectedLaddersIndexContainer = connect(mapLaddersIndexContainerStateToProps)(LaddersIndexContainer)
    // var ConnectedLoginContainer = connect(mapLoginContainerStateToProps)(LoginContainer)

    render(
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route path="/" component={ConnectedAppContainer} >
                    {/*<IndexRoute component={ConnectedDashBoardContainer}/>*/}
                    <IndexRoute component={ConnectedPongupHomeContainer}/>
                    <Route path="ladders" component={ConnectedLaddersContainer} >
                        <IndexRoute component={ConnectedLaddersIndexContainer} />
                        <Route path="my-ladders" component={ConnectedMyLaddersContainer} ></Route>
                        <Route path=":ladder_id" component={ConnectedLadderDetailContainer} ></Route>
                        
                    </Route>
                        {/*<Route path="message/:message_id" component={ConnectedMessageContainer}/>*/}
                    {/*</Route>*/}
                    {/*<Route path="login" component={ConnectedLoginContainer} />*/}
                    {/*<Route path="ladders" component={ConnectedLaddersContainer} />*/}
                </Route>
            </Router>
        </Provider>,

        document.getElementById('react-pongup-app-container')

    );
}

// var ConnectedCalendarContainer = connect(mapCalendarStateToProps)(CalendarContainer);
// <Route path="calendar/:venueId/" component={ConnectedCalendarContainer}>
//     <Route path="day" component={DayCalendarView} />
//     <Route path="week" component={WeekCalendarView} />
//     <Route path="month" component={MonthCalendarView} />
// </Route>


// function mapCalendarStateToProps(state) {
//     return {
//         venue: state.calendar.venue,
//         venues: state.calendar.venues,
//         calendarView: state.calendar.calendarView,
//         externalCalendars: state.calendar.externalCalendars,
//         isModalOpen: state.calendar.isModalOpen,
//         eventEditData: state.calendar.eventEditData,
//         activeDay: state.calendar.activeDay
//     }
// }
