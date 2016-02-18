import * as actions from '../actions'
// import classNames from 'classnames'
import { RankingList } from './RankingList'
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

    buildRankingList() {
        var self = this
        return self.props.ladder_detail.map(function(player, index) {
            return (
                <RankingList 
                    key={index}
                    rank={player.ladder_rank}
                    player_name={player.user.username}
                    {...self.props}
                />
            )
        })
    }

    render() {
        var self = this
        console.log('LadderDetailContainer')
        console.log(self.props)
        return (
            <div className="container-1600">

                <div className="ladder-detail-header">
                    <p className="header-label">Ladder:</p>
                    <h3 className="ladder-name">{ self.props.is_loading ? self.loading() : self.getCurrentLadder().name }</h3>
                </div>

                <div className="left-wrapper">
                    <p className="header-label category">Scheduled Matches:</p>
                    <ul className="scheduled-matches-list">
                        <li>
                            
                            <div className="scheduled-matches-container">
                                <p className="seed">#2</p>
                                <p className="player-name">Gale VanRossem</p>
                                <input type="text" placeholder="Score"/>
                                <p className="seed">vs. #3</p>
                                <p className="player-name">Yale Reardon</p>
                                <input type="text" placeholder="Score"/>
                            </div>
                            <p className="header-label">Friday, Jan. 15 3:30pm</p>
                            <a className="primary submit-btn"href="#submit">Submit scores</a>
                        </li>
                        <li>
                            <div className="scheduled-matches-container">
                                <p className="seed">#1</p>
                                <p className="player-name">Bob Chappuis</p>
                                
                                <p className="seed">vs. #4</p>
                                <p className="player-name">Ryder Lewis</p>
                                
                            </div>
                            <p className="header-label">Friday, Jan. 15 3:30pm</p>
                        </li>
                    </ul>
                </div>

                <div className="right-wrapper">
                    <p className="header-label category">Rankings:</p>
                    <ul>
                        {(self.props.ladder_detail && self.props.ladder_detail.length > 0) ? self.buildRankingList() : null}
                    </ul>
                </div>

                <a className="primary homepage-cta" href="#joinLadder">+ Add a ladder</a>
            </div>
        )
    }
}