import * as actions from '../actions'
// import classNames from 'classnames'
import React, { Component } from 'react'

export class RankingList extends Component {
	constructor(props) {
		//explicit call to super must remain because of es7 weirdness and class property usage below
		super(props);
	}

    render() {
        var self = this
        console.log('RankingList')
        console.log(self.props)

        return (
			<li className="ladder-rank-list">
                <a href="#" >
                    <p className="rank">{self.props.rank}</p>
    				<p className="name">{self.props.player_name}</p>
                </a>
			</li>
        )
    }
}