import * as actions from '../actions'
// import classNames from 'classnames'
import React, { Component } from 'react'

export class RankingList extends Component {
	constructor(props) {
		//explicit call to super must remain because of es7 weirdness and class property usage below
		super(props);
	}

    renderRanking() {
        var self = this

        if (self.props.rank) {
            return (
                <p className="rank">{self.props.rank}</p>
            )
        } else {
            return (
                <p className="rank">N</p>
            )
        }
    }

    render() {
        var self = this

        return (
			<li className="ladder-rank-list">
                <a href="#" >
                    {self.renderRanking()}
                    <p className="name">{self.props.player_name}</p>
                </a>
			</li>
        )
    }
}