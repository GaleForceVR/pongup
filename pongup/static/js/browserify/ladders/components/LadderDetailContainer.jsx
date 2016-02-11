import * as actions from '../actions'
// import classNames from 'classnames'
import { LaddersList } from './LaddersList'
import React, { Component } from 'react'

export class LadderDetailContainer extends Component {
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
    }

    getCurrentLadder() {
        var self = this
        var current_ladder

        for (var i = 0; i < self.props.ladders.length; i++) {
            if (self.props.ladders[i].id == self.props.params.ladder_id) {
                current_ladder = self.props.ladders[i]
            }
        }

        return current_ladder.name
    }

    render() {
        var self = this

        return (
            <div>
                <ul>

                    <h5>Ladder:</h5>
                    <h1>{ self.props.is_loading ? self.loading() : self.getCurrentLadder() }</h1>
                    {/*(self.props.ladders && self.props.ladders.length > 0) ? self.buildLadderList() : null*/}
                </ul>
                <a className="primary homepage-cta" href="#joinLadder">+ Add a ladder</a>
            </div>
        )
    }
}