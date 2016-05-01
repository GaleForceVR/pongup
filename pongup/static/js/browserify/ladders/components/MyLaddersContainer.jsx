import * as actions from '../actions'
// import classNames from 'classnames'
import React, { Component } from 'react'

export class MyLaddersContainer extends Component {
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
        self.props.dispatch(actions.loadLadders())
        // self.props.dispatch(actions.loadMatchDetails())
    }

    render() {
        var self = this
        var all_ladders = self.props.ladders.map(
                    (ladder)=>{ return (ladder.id) }
                )

        return (
            <div>
                <ul>
                    <h1>My Ladders</h1>
                    {/*(self.props.ladders && self.props.ladders.length > 0) ? self.buildLadderList() : null*/}
                </ul>
                <a className="primary homepage-cta" href="#joinLadder">+ Add a ladder</a>
            </div>
        )
    }
}