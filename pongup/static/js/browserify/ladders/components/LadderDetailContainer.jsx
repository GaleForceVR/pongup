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

    shouldComponentUpdate() {
        return true
    }

    componentDidMount() {
        var self = this
        var current_ladder_id = self.getCurrentLadder().id

        // self.props.dispatch(actions.loadLadders())
        self.props.dispatch(actions.loadLadderDetail(current_ladder_id))

        self.props.dispatch(actions.loadMatchesDetail(current_ladder_id))

        
    }

    componentDidUpdate() {
        var self = this
        if (self.props && self.props.ladder_detail && self.props.ladder_detail.length > 0) {
            self.props.dispatch(actions.checkParticipation(self.props.username))
        }

        if (self.props && self.props.ladders) {
            for (var i = 0; i < self.props.ladders.length; i++) {
                if (self.props.ladders[i].id.toString() === self.props.params.ladder_id && self.props.ladders[i].manager === self.props.current_user) {
                    self.props.dispatch(actions.isManager())
                }
            }
        }
    }

    getCurrentLadder() {
        var self = this
        var current_ladder        

        for (var i = 0; i < self.props.ladders.length; i++) {
            if (self.props.ladders[i].id == self.props.params.ladder_id) {
                current_ladder = self.props.ladders[i]
            }
        }

        // self.props.dispatch(actions.setCurrentLadder(current_ladder))

        return current_ladder
    }

    buildRankingList() {
        var self = this
        return self.props.ladder_detail.map(function(user_ladder, index) {
            return (
                <RankingList 
                    key={index}
                    index={index}
                    rank={user_ladder.ladder_rank}
                    player_name={user_ladder.user.username}
                    is_editing_rankings={self.state.is_editing_rankings}
                    user_ladder_id={user_ladder.id}
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
                    match={match}
                    ladder_detail={match.ladder_detail}
                    matches_detail={match.matches_detail}
                    player_a_rank={player_a_rank}
                    player_a_username={player_a_username}
                    player_b_rank={player_b_rank}
                    player_b_username={player_b_username}
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

    handleJoinLadderClick() {
        var current_ladder_id = this.getCurrentLadder().id
        var current_user = this.props.current_user
        this.props.dispatch(actions.submitJoinLadderRequest(current_ladder_id, current_user))
    }

    renderJoinLadderButton() {
        var self = this
        return (
            <a 
                className="primary join-ladder-button" 
                href="#joinLadder"
                onClick={(e) => {
                    self.handleJoinLadderClick()
                }}
            >Join this ladder</a>

        )
    }

    renderEditRankingsButton() {
        var self = this
        console.log('renderEditRankingsButton()')
        console.log(this.props)
        const ladder_id = parseInt(this.props.params.ladder_id)
        return (
            <span>
                { self.props.is_editing_rankings ? 
                        <a
                            className="edit-btn right cta"
                            onClick={()=>{
                                // self.setState({is_editing_rankings: true})

                                self.props.dispatch(actions.submitRankingUpdate(ladder_id))
                                self.props.dispatch(actions.toggleEditRankings())
                            }}
                        >Submit rankings</a>
                    :
                        <a
                            className="edit-btn right"
                            onClick={()=>{
                                // self.setState({is_editing_rankings: true})
                                self.props.dispatch(actions.toggleEditRankings())
                            }}
                        >Edit rankings</a>
                }
            </span>
        )
    }

    render() {
        var self = this
        // var current_ladder_id = self.getCurrentLadder().id

        

        console.log(self.props)
        return (
            <div className="container-1600">

                <div className="ladder-detail-header">
                    <p className="header-label">Ladder:</p>
                    <h3 className="ladder-name">{ self.props.is_loading ? self.loading() : self.getCurrentLadder().name }</h3>
                </div>

                <div className="right-wrapper">
                    {(self.props.ladder_detail && !self.props.is_in_ladder) ? self.renderJoinLadderButton() : null }
                    <div className="clearfix"></div>
                    <p className="header-label category rankings-header">Rankings:</p>
                    { self.props.is_manager ? self.renderEditRankingsButton() : null }
                    <div className="clearfix"></div>

                    <ul className="ladder-rank-list-wrapper">
                        {(self.props.ladder_detail && self.props.ladder_detail.length > 0) ? self.buildRankingList() : null}
                        
                    </ul>

                </div>

                <div className="left-wrapper">
                    <p className="header-label category">Scheduled Matches:</p>
                    <ul className="scheduled-matches-list">
                        { (this.props.matches_detail && this.props.matches_detail.length > 0) ? this.buildMatches() : this.buildNoMatches() }
                    </ul>
                </div>

                

                
            </div>
        )
    }
}