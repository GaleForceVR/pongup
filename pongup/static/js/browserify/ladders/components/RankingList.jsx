import * as actions from '../actions'
// import classNames from 'classnames'
import React, { Component } from 'react'
import classNames from 'classNames'
import ReactTooltip from 'react-tooltip'

export class RankingList extends Component {
	constructor(props) {
		//explicit call to super must remain because of es7 weirdness and class property usage below
		super(props);
        this.state = {
            show_schedule_match_form: false
        }
	}

    handleChange(e, index) {
        // this.props.user_ladder_id
        this.props.dispatch(actions.setNewRankings(index, e.target.value))
    }

    handleBlur(e, index) {
        this.props.dispatch(actions.checkValidations(e.target.name, e.target.value, index))
    }

    handleApprovalClick(e) {
        console.log('handleApprovalClick')
        console.log(this.props.user_ladder_id)
        console.log(this.props)
        this.props.dispatch(actions.approvePlayer(this.props.user_ladder_id, this.props.ladder_id))
    }

    handleScheduleMatchClick(e, match_type) {
        console.log('handleScheduleMatchClick')
        console.log(match_type)
    }

    renderEditableRank() {
        const index = this.props.index
        return (
            <span>
                {/*<p className="rank">{this.props.rank}</p>*/}
                <input 
                    className={classNames("rank-input active", {'error': (this.props.errors && this.props.errors[index] && this.props.errors[index].ladder_rank)})}
                    name="ladder_rank" 
                    value={this.props.new_rankings[index].ladder_rank}
                    onChange={(e)=>{
                        this.handleChange(e, index)
                    }}
                    onBlur={(e)=>{
                        this.handleBlur(e, index)
                    }}
                />
            </span>
        )
    }

    renderUnEditableRank() {
        const index = this.props.index
        let rank = this.props.rank
        console.log('before conditional')
        console.log(this.props)
        if (this.props.new_rankings[index].ladder_rank && this.props.rankings_updated) {
            rank = this.props.rank
        }
        console.log('renderUnEditableRank')
        console.log(this.props.rank)

        return (
            <span>
                {/*<p className="rank">{this.props.rank}</p>*/}
                <input 
                    className="rank-input" 
                    defaultValue={rank}
                    value={rank}
                    readOnly={true}
                />
            </span>
        )
    }

    renderRanking() {
        var self = this
        console.log('RankingList')
        console.log(self.props)

        // if (self.props.rank) {
        //     return (
        //         <span>
        //             <p className="rank">{self.props.rank}</p>
        //             {/*self.props.is_manager && self.props.is_editing_rankings ? self.renderEditableRank() : self.renderUnEditableRank()*/}
        //             {/*self.renderUnEditableRank()*/}
        //             {self.renderEditableRank()}
        //         </span>
        //     )
        // } else {
        //     return (
        //         <span>
        //             <p className="rank">-</p>
        //             <input
        //                 className="rank-input"
        //                 defaultValue={'-'}
        //                 readOnly={true}
        //             />
        //         </span>
        //     )
        // }

        return (
            <span>
                {self.props.approved && self.props.is_manager && self.props.is_editing_rankings ? self.renderEditableRank() : self.renderUnEditableRank()}
                {/*self.renderUnEditableRank()*/}
                {/*self.renderEditableRank()*/}
            </span>
        )
    }

    renderApprovalButton() {
        return (
            <span>
                <a 
                    className="edit-btn approval cta"
                    onClick={(e)=>{
                        this.handleApprovalClick(e)
                    }}
                >
                    <p>Approve</p>
                </a>
            </span>
        )
    }

    renderApprovalPending() {
        return (
            <span>
                <a className="edit-btn friendly approval-pending">
                    <p>Approval pending</p>
                </a>
            </span>
        )
    }



    renderMatchSchedulerForm() {
        return (
            <form className="create-match-form">
                
                <input
                    type="text"
                    name="match_date"
                />
            </form>
        )
    }

    renderMatchSchedulerButton() {

        const rank = this.props.rank
        const current_user_rank = this.props.current_user_rank

        console.log('%crenderMatchSchedulerButton', 'background-color:blue;color:yellow')
        console.log(rank < current_user_rank && rank > current_user_rank - 2)

        return (
            <span>
                { (rank < current_user_rank && rank >= current_user_rank - 2) ? 
                        <span>
                            <a
                                className="schedule-btn challenge"
                                data-tip="schedule a CHALLENGE match"
                                data-for="challenge-match"
                                onClick={(e)=>{
                                    this.handleScheduleMatchClick(e, 'challenge')
                                }}
                            >
                                <div className="pongup-ball-btn">
                                    {/*<p>Challenge</p>*/}
                                </div>
                            </a>
                            <ReactTooltip 
                                id="challenge-match"
                                class="tooltip"
                                place="right"
                                type="light"
                                effect="solid"
                            />
                        </span>
                    :
                        (rank == current_user_rank ? 

                                null
                            :
                                <span>
                                    <a
                                         className="schedule-btn friendly"
                                         data-tip="schedule a FRIENDLY match"
                                         data-for="friendly-match"
                                         onClick={(e)=>{
                                             this.handleScheduleMatchClick(e, 'friendly')
                                         }}
                                    >
                                        <div className="pongup-ball-btn">
                                            {/*<p>Friendly</p>*/}
                                        </div>
                                    </a>
                                    <ReactTooltip
                                        id="friendly-match"
                                        class="tooltip"
                                        place="right"
                                        type="light"
                                        effect="solid"
                                    />
                                </span>
                        )
                        
                }
            </span>
        )
    }

    render() {
        var self = this

        console.log('RankingList.jsx')
        console.log(self.props)

        return (
			<li className="ladder-rank-list">
                {self.renderRanking()}
                <a href="#" >
                    <p className="name">{self.props.player_name}</p>
                </a>
                {self.props.is_manager && !self.props.approved ? self.renderApprovalButton() : (!self.props.approved ? self.renderApprovalPending() : self.renderMatchSchedulerButton())}
                {self.state.show_schedule_match_form ? self.renderMatchSchedulerForm() : null }
			</li>
        )
    }
}