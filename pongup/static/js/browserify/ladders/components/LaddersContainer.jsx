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
        self.props.dispatch(actions.loadLadders())
    }

    getLadders() {
        var all_ladders = self.props.ladders.map(
            (ladder)=>{ return (ladder.id) }
        )
    }

    render() {
        var self = this
        var all_ladders = self.props.ladders.map(
                    (ladder)=>{ return (ladder.id) }
                )
        console.log('all_ladders')
        console.log(all_ladders)

        return (
            <div>
                <a className="primary homepage-cta" href="#joinLadder">Ladders Container</a>
            </div>
        )
    }
}