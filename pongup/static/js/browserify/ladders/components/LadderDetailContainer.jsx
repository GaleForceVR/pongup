import * as actions from '../actions'
// import classNames from 'classnames'
import { RankingList } from './RankingList'
import { MatchDetail } from './MatchDetail'
import React, { Component } from 'react'
import moment from 'moment'

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

        let current_user_rank = null
        let current_user_approved = false

        for (var i = 0; i < self.props.ladder_detail.length; i++) {
            if (self.props.ladder_detail[i].user.username == self.props.username) {
                current_user_rank = self.props.ladder_detail[i].ladder_rank
                current_user_approved = self.props.ladder_detail[i].approved
            }
        }
        console.log('buildRankingList')
        console.log(self.props)
        console.log(self.props.ladder_detail)

        return self.props.ladder_detail.map(function(user_ladder, index) {
            return (
                <RankingList 
                    key={index}
                    index={index}
                    approved={user_ladder.approved}
                    current_user_approved={current_user_approved}
                    rank={user_ladder.ladder_rank}
                    current_user_rank={current_user_rank}
                    ladder_id={self.props.params.ladder_id}
                    player_name={user_ladder.user.username}
                    is_editing_rankings={self.state.is_editing_rankings}
                    user_ladder_id={user_ladder.id}
                    {...self.props}
                />
            )
        })
    }

    buildMatch(match, index) {
        var ladder_list = this.props.ladder_detail

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
                alternate_date={match.alternate_date}
                {...this.props}
            />
        )
    }

    buildChallengeMatches() {
        var self = this
        return self.props.matches_detail.map(function(match, index) {
            if (match.is_challenge_match) {
                return (
                    <span>
                        { self.buildMatch(match, index) }
                    </span>
                )    
            }
        })
    }

    buildFriendlyMatches() {
        var self = this
        return self.props.matches_detail.map(function(match, index) {
            if (!match.is_challenge_match) {
                return (
                    <span>
                        { self.buildMatch(match, index)}
                    </span>
                )
            }
        })
    }

    buildNoChallengeMatches() {
        return (
            <li>
                <div className="scheduled-matches-container">
                    <p className="seed no-matches-msg">There are no Challenge Matches scheduled at this time.</p>
                </div>
            </li>
        )
    }

    buildNoFriendlyMatches() {
        return (
            <li>
                <div className="scheduled-matches-container">
                    <p className="seed no-matches-msg">There are no Friendly Matches scheduled at this time.</p>
                </div>
            </li>
        )
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

        var current_ladder = self.getCurrentLadder()
        return (
            <div className="container-1600">

                <div className="ladder-detail-header">
                    <p className="header-label">Ladder:</p>
                    <h3 className="ladder-name">{ self.props.is_loading ? self.loading() : current_ladder.name }</h3>
                    <p className="header-label start-date">Start: <span className="emphasis">{moment(current_ladder.start_date).format('M / D / Y')}</span></p>
                    <p className="header-label end-date">End: <span className="emphasis">{moment(current_ladder.end_date).format('M / D / Y')}</span></p>
                    {current_ladder.location ? <p className="header-label location">{current_ladder.location}</p> : null}
                </div>

                <div className="right-wrapper">
                    {(self.props.ladder_detail && !self.props.is_in_ladder) ? self.renderJoinLadderButton() : null }
                    <div className="clearfix"></div>
                    <p className="header-label category rankings-header">Rankings:</p>
                    { self.props.is_manager ? self.renderEditRankingsButton() : null }
                    {/*self.renderEditRankingsButton()*/}
                    <div className="clearfix"></div>

                    <ul className="ladder-rank-list-wrapper">
                        {(self.props.ladder_detail && self.props.ladder_detail.length > 0) ? self.buildRankingList() : null}
                        
                    </ul>

                </div>

                <div className="left-wrapper">
                    <p className="header-label category">Challenge Matches:</p>
                    <ul className="scheduled-matches-list challenge-matches">
                        { (this.props.matches_detail && this.props.matches_detail.length > 0) ? this.buildChallengeMatches() : this.buildNoChallengeMatches() }
                    </ul>
                    <p className="header-label category">Friendly Matches:</p>
                    <ul className="scheduled-matches-list">
                        { (this.props.matches_detail && this.props.matches_detail.length > 0) ? this.buildFriendlyMatches() : this.buildNoFriendlyMatches() }
                    </ul>
                </div>

                

                
            </div>
        )
    }
}