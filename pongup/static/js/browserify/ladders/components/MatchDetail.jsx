import * as actions from '../actions'
// import classNames from 'classnames'
import React, { Component } from 'react'

export class MatchDetail extends Component {
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

    render() {
		var self = this
		console.log('%cMatchDetail', 'background-color:blue;color:yellow')
		console.log('%c ' + self, 'background-color:blue;color:white')
		console.log(self.props)
		return (
			<li>
				<div className="scheduled-matches-container">
					<p className="seed">#{self.props.player_a_rank}</p>
					<p className="player-name">{self.props.player_a_username}</p>
					<input type="text" placeholder="Score"/>
					<p className="seed">vs. #3</p>
					<p className="player-name">Yale Reardon</p>
					<input type="text" placeholder="Score"/>
				</div>
				<p className="header-label">Friday, Jan. 15 3:30pm</p>
				<a className="primary submit-btn"href="#submit">Submit scores</a>
			</li>
		)
    }
}
