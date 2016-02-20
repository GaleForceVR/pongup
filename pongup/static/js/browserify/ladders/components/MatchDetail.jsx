import * as actions from '../actions'
// import classNames from 'classnames'
import React, { Component } from 'react'
import moment from 'moment'

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
					<p className="seed">vs. #{self.props.player_b_rank}</p>
					<p className="player-name">{self.props.player_b_username}</p>
					<input type="text" placeholder="Score"/>
				</div>
				<p className="header-label">{moment(self.props.matches_detail[self.props.index].match_date).format('ddd, MMM D YYYY, h:mm a')}</p>
				<a className="primary submit-btn"href="#submit">Submit scores</a>
			</li>
		)
    }
}
