import 'babel-polyfill'

// imported modules and libraries
import { createHistory } from 'history'
import { hashHistory } from 'history'
import { syncHistory } from 'redux-simple-router'
import { syncHistoryToStore } from 'redux-simple-router'

import { connect, Provider } from 'react-redux'
import configureStore from './store'
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link } from 'react-router'
import { syncReduxAndRouter } from 'redux-simple-router'

// imported components

import { AppContainer } from './components/AppContainer'
import { LaddersContainer } from '../ladders/components/LaddersContainer'

// import { ControlPanelContainer } from './components/ControlPanelContainer'
// import { DashBoardContainer } from '../dashboard/components/DashBoardContainer'
// import { InboxContainer } from '../inbox/components/InboxContainer'
// import { MessageContainer } from '../inbox/components/MessageContainer'
// import { MyListingsContainer } from '../my_listings/components/MyListingsContainer'

// import { CalendarContainer } from '../calendar/components/CalendarContainer'
// import { DayCalendarView } from '../calendar/components/DayCalendarView'
// import { WeekCalendarView } from '../calendar/components/WeekCalendarView'
// import { MonthCalendarView } from '../calendar/components/MonthCalendarView'
// import * as CalendarActions from '../calendar/actions'

function mapAppContainerStateToProps(state) {
    return {
        active_app: state.pongup_reducer.active_tab,
        username: state.pongup_reducer.username
    };
}

// function mapControlPanelContainerStateToProps(state) {
//     return {
//         active_app: state.control_panel_reducer.active_tab,
//         is_loading: state.control_panel_reducer.is_loading,
//         user_profile: state.control_panel_reducer.user_profile,
//         unread_count: state.control_panel_reducer.unread_count,
//         venues_and_events: state.control_panel_reducer.venues_and_events
//     }
// }

function mapLaddersContainerStateToProps(state) {
    return {
        // active_app: state.pongup_reducer.active_tab
        active_app: 'home'
    };
}

// function mapDashBoardStateToProps(state) {
//     return {
//         active_app: state.control_panel_reducer.active_tab,
//         is_loading: state.dashboard_reducer.is_loading,
//         message_data: state.dashboard_reducer.message_data,
//         listings: state.dashboard_reducer.listings,
//         proposals: state.dashboard_reducer.proposals,
//         user_profile: state.control_panel_reducer.user_profile,
//         venues_and_events: state.control_panel_reducer.venues_and_events
//     }
// }

// function mapInboxStateToProps(state) {
//     return {
//         active_app: state.control_panel_reducer.active_tab,
//         filter_status: state.inbox_reducer.filter_status,
//         has_next: state.inbox_reducer.has_next,
//         has_previous: state.inbox_reducer.has_previous,
//         is_loading: state.inbox_reducer.is_loading,
//         num_pages: state.inbox_reducer.num_pages,
//         messages_for_venues: state.inbox_reducer.messages_for_venues,
//         page: state.inbox_reducer.page,
//         page_range: state.inbox_reducer.page_range,
//         single_message_view: state.inbox_reducer.single_message_view,
//         threads: state.inbox_reducer.threads,
//         threads_loading: state.inbox_reducer.threads_loading,
//         unread_count: state.inbox_reducer.unread_count,
//         user_profile: state.control_panel_reducer.user_profile,
//         venues_and_events: state.control_panel_reducer.venues_and_events
//     }
// }

// function mapMessageStateToProps(state) {
//     return {
//         active_app: state.control_panel_reducer.active_tab,
//         messages_in_view_inquiry: state.inbox_reducer.messages_in_view_inquiry,
//         messages_in_view_thread: state.inbox_reducer.messages_in_view_thread,
//         message_is_loading: state.inbox_reducer.message_is_loading,
//         reply_open: state.inbox_reducer.reply_open,
//         user_profile: state.control_panel_reducer.user_profile,
//         venues_and_events: state.control_panel_reducer.venues_and_events
//     }
// }

// function mapMyListingsStateToProps(state) {
//     return {
//         venues: state.my_listings_reducer.venues

//     }
// }

export function init() {
    console.log('init start')
    const store = configureStore();
    const history = createHistory();
    // syncReduxAndRouter(history, store);
    const router = syncHistory(hashHistory);
    // router.syncHistoryToStore(store);

    // send dispatch() as a prop down to the components...
    console.log(AppContainer)
    console.log(mapAppContainerStateToProps)
    var ConnectedAppContainer = connect(mapAppContainerStateToProps)(AppContainer)
    console.log(ConnectedAppContainer)
    // var ConnectedLaddersContainer = connect(mapLaddersContainerStateToProps)(LaddersContainer)

    // var ConnectedControlPanelContainer = connect(mapControlPanelContainerStateToProps)(ControlPanelContainer)
    // var ConnectedDashBoardContainer = connect(mapDashBoardStateToProps)(DashBoardContainer);
    // var ConnectedInboxContainer = connect(mapInboxStateToProps)(InboxContainer)
    // var ConnectedMessageContainer = connect(mapMessageStateToProps)(MessageContainer)
    // var ConnectedMyListingsContainer = connect(mapMyListingsStateToProps)(MyListingsContainer)
    console.log('render inside init')
    render(
        <Provider store={store}>
            <Router history={history}>
                <Route path="/" component={ConnectedAppContainer} >
                    {/*<IndexRoute component={ConnectedDashBoardContainer}/>*/}
                    {/*<IndexRoute component={ConnectedPongupHomeContainer}/>*/}
                    {/*<Route path="inbox" component={ConnectedInboxContainer} >*/}
                        {/*<Route path="message/:message_id" component={ConnectedMessageContainer}/>*/}
                    {/*</Route>*/}
                    {/*<Route path="my-listings" component={ConnectedMyListingsContainer} />*/}
                    {/*<Route path="ladders" component={ConnectedLaddersContainer} />*/}
                </Route>
            </Router>
        </Provider>,

        document.getElementById('react-pongup-app-container')

    );
    console.log('after render inside init')
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
