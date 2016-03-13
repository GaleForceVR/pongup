import * as actions from '../actions'
// import classNames from 'classnames'
import { RankingList } from './RankingList'
import { MatchDetail } from './MatchDetail'
import React, { Component } from 'react'

export class LadderDetailContainer extends Component {
    constructor(props) {
        //explicit call to super must remain because of es7 weirdness and class property usage below
        super(props);
        this.state = {
            errors: this.props.errors,
            player_a_score: this.props.player_a_score,
            liked: false
        }

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
        var current_ladder_id = self.getCurrentLadder().id

        self.props.dispatch(actions.loadLadders())
        self.props.dispatch(actions.loadLadderDetail(current_ladder_id))
        self.props.dispatch(actions.loadMatchesDetail(current_ladder_id))
    }

    getCurrentLadder() {
        var self = this
        var current_ladder        

        for (var i = 0; i < self.props.ladders.length; i++) {
            if (self.props.ladders[i].id == self.props.params.ladder_id) {
                current_ladder = self.props.ladders[i]
            }
        }

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

    buildMatches() {
        var self = this


        return self.props.matches_detail.map(function(match, index) {

            var ladder_list = self.props.ladder_detail

            var player_a_username = match.player_a.username
            var player_b_username = match.player_b.username

            var player_a_rank
            var player_b_rank

            // TODO iterate over self.props.ladder_detail to get ladder_rank
            // TODO iterate over self.props.match_detail to get 
            for (var i = 0; i < ladder_list.length; i++) {
                var next_username = ladder_list[i].user.username
                
                if (next_username == player_a_username) {
                    player_a_rank = ladder_list[i].ladder_rank
                } else if (next_username == player_b_username) {
                    player_b_rank = ladder_list[i].ladder_rank
                }
            }
            return (
                <MatchDetail
                    key={index}
                    index={index}
                    ladder_detail={match.ladder_detail}
                    matches_detail={match.matches_detail}
                    player_a_rank={player_a_rank}
                    player_a_username={player_a_username}
                    player_b_rank={player_b_rank}
                    player_b_username={player_b_username}
                    errors={self.state.errors}
                    {...self.props}
                />
            )

        })
    }

    buildNoMatches() {
        <li>
            <div className="scheduled-matches-container">
                <p className="seed">There are no matches scheduled at this time.</p>
            </div>
        </li>
    }

    render() {
        var self = this
        return (
            <div className="container-1600">

                <div className="ladder-detail-header">
                    <p className="header-label">Ladder:</p>
                    <h3 className="ladder-name">{ self.props.is_loading ? self.loading() : self.getCurrentLadder().name }</h3>
                </div>

                <div className="left-wrapper">
                    <p className="header-label category">Scheduled Matches:</p>
                    <ul className="scheduled-matches-list">
                        { (this.props.matches_detail && this.props.matches_detail.length > 0) ? this.buildMatches() : this.buildNoMatches() }
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