import * as actions from '../actions'
// import classNames from 'classnames'
import React, { Component } from 'react'

var $ = require('jquery')


export class PongupHomeContainer extends Component {
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
        $('.haters').fadeOut(2000)
        $('.haters').fadeIn(2000)

        self.props.dispatch(actions.loadPongupHome())
    }

    render() {
        var self = this
        return (
            <div className="homepage haters">
                <a className="primary homepage-cta" href="#joinLadder">Join a Ladder</a>
            </div>
        )
    }
}