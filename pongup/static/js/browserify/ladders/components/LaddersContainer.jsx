import * as actions from '../actions'
// import classNames from 'classnames'
import React, { Component } from 'react'

export class LaddersContainer extends Component {
    constructor(props) {
        //explicit call to super must remain because of es7 weirdness and class property usage below
        super(props);

    }

    loading() {
        return (
            <div className="infinite-list-item" style={{textAlign: "center"}}>
                <h4>Loading...</h4>
                <br/>
                <img src="/static/img/loading.gif" style={{width: "50px"}} />
            </div>
        )
    }

    componentDidMount() {
        var self = this
        console.log('%cPongupHomeContainer componentDidMount', 'background-color:blue')
        console.log(self)
        console.log(self.props)
        // console.log(self.props.venues_and_events)
        // var venues = self.props.venues_and_events.venues.map(
        //     (venue)=>{ return (venue.id) }
        // ).toString()
        // var events = self.props.venues_and_events.events.map(
        //     (event)=>{ return (event.id) }
        // ).toString()
        // self.props.dispatch(
        //     actions.loadDashboard({
        //         messages: {
        //             page: 1,
        //             venues: venues,
        //             events: events,
        //             sort: "-updated",
        //             status: "o"
        //         }
        //     })
        // )
        self.props.dispatch(actions.loadLadders())
    }

    // <div className="container messaging-override">
 //        <h1 className="dashboard-header">
 //            Dashboard
 //        </h1>
 //        {
 //            self.props.is_loading ?
 //                self.loading() :
 //                <div className="dashboard-row-container">
 //                    <MessageContainer {...self.props} />
 //                    <ProposalContainer {...self.props} />
 //                    <ListingsContainer {...self.props} />
 //                </div>
 //        }

 //        <div class="clearfix"></div>
 //    </div>

    // shouldComponentUpdate(nextProps) {
    //     return nextProps.venues_and_events.venues !== self.props.venues_and_events.venues
    // }

    render() {
        var self = this
        console.log('%cLaddersContainer', "background-color:yellow")
        console.log(self.props)
        return (
            <div className="homepage">
                <a className="primary homepage-cta" href="#joinLadder">Ladders Container</a>
            </div>
        )
    }
}