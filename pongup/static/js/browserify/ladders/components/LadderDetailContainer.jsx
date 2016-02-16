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
        self.props.dispatch(actions.loadLadderDetail(self.getCurrentLadder().id))
    }

    getCurrentLadder() {
        var self = this
        var current_ladder        

        for (var i = 0; i < self.props.ladders.length; i++) {
            if (self.props.ladders[i].id == self.props.params.ladder_id) {
                current_ladder = self.props.ladders[i]
            }
        }

        console.log('current_ladder')
        console.log(current_ladder)
        

        return current_ladder
    }

    render() {
        var self = this
        console.log('LadderDetailContainer')
        console.log(self.props)
        return (
            <div className="container-1600">
                <div className="left-wrapper">
                <ul>

                    <h5>Ladder:</h5>
                    <h1>{ self.props.is_loading ? self.loading() : self.getCurrentLadder().name }</h1>
                    {/*(self.props.ladders && self.props.ladders.length > 0) ? self.buildLadderList() : null*/}
                </ul>
                </div>
                <div className="right-wrapper">
                </div>
                <a className="primary homepage-cta" href="#joinLadder">+ Add a ladder</a>
            </div>
        )
    }
}