import * as actions from '../actions'
import classNames from 'classnames'
import React, { Component } from 'react'
import moment from 'moment'
import listensToClickOutside from 'react-onclickoutside/decorator'
import { connect } from 'react-redux'

export class _MatchDetail extends Component {
    constructor(props) {
        //explicit call to super must remain because of es7 weirdness and class property usage below
        super(props);
        this.state = {
			// errors: this.props.errors,
			// player_a_score: this.props.player_a_score,
			// player_b_score: this.props.player_b_score,
			match_id: this.props.match_id
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
        this.handleClickOutside = this.handleClickOutside.bind(this)
        this.renderMatchInfoAndForm = this.renderMatchInfoAndForm.bind(this)
        this.renderMatchInfoWithoutForm = this.renderMatchInfoWithoutForm.bind(this)

    }

    handleSubmit(e, index) {
		this.props.dispatch(actions.submitScores(this.props.match.id, index))
    }

    handleChange(e) {	
		var score_obj = {}
		var indexed_score = {}
		var index = this.props.index

		var player = e.target.name
		var score = e.target.value

		score_obj[index] = score
		indexed_score[player] = score_obj


		// score_obj[player] = score
		// indexed_score[index] = score_obj


		this.props.dispatch(actions.updateScore(indexed_score))
    }

    handleBlur(e) {
		var self = this
		var player = e.target.name
		var score = e.target.value
		var index = self.props.index
		self.props.dispatch(actions.checkValidations(player, score, index))
    }

    componentDidMount() {
		this.forceUpdate()
    }

    componentWillReceiveProps(nextProps){
		if (nextProps.force_update != this.props.force_update) {
			this.forceUpdate()
			// this.setState(this.state)
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

    handleClickOutside = () => {
		this.props.dispatch(
			actions.saveAndExitEditMode({
				player_a_score: this.props.player_a_score,
				player_b_score: this.props.player_b_score,
				errors: this.props.errors,
				is_editing: false
			})
		)
		// this.setState(this.state)
    };

    renderMatchInfoAndForm() {
		var self = this
		var index = self.props.index
		// var text = this.state.liked ? 'like' : 'haven\'t liked'
		return (
			<div className={classNames({'force-update': self.props.force_update})}>
				<div 
					className="scheduled-matches-container"
					>
					
					<p className="seed">#{self.props.player_a_rank}</p>
					<p className="player-name">{self.props.player_a_username}</p>
					{self.props.errors && self.props.errors[index] && self.props.errors[index].player_a_score && <div>{self.props.errors[index].player_a_score}</div>}
					<input 
						type="text" 
						name="player_a_score"
						placeholder="Score"
						value={this.props.player_a_score[index]}
						onChange={this.handleChange.bind(this)}
						onBlur={this.handleBlur.bind(this)}
						className={classNames({'error': (this.props.errors && this.props.errors[index] && this.props.errors[index].player_a_score) })} 
						/>
					<p className="seed">vs. #{self.props.player_b_rank}</p>
					<p className="player-name">{self.props.player_b_username}</p>
					{self.props.errors && self.props.errors[index] && self.props.errors[index].player_b_score && <div>{self.props.errors[index].player_b_score}</div>}
					<input 

						type="text" 
						name="player_b_score" 
						placeholder="Score"
						value={this.props.player_b_score[index]}
						onChange={this.handleChange.bind(this)}
						onBlur={this.handleBlur.bind(this)}
						className={classNames({'error': (this.props.errors && this.props.errors[index] && this.props.errors[index].player_b_score)})}
						/>
				</div>
				<p className="header-label match-date">{moment(self.props.matches_detail[self.props.index].match_date).format('ddd, MMM D YYYY, h:mm a')}</p>
				<a 
					className="primary submit-btn" 
					href="#submit"
					onClick={(e)=> {
						this.handleSubmit(e, self.props.index)
					}}
					>
					Submit scores
				</a>
			</div>
		)
    }

    renderScore(score) {
		return(
			<p className="player-score">{score}</p>
		)
    }

    renderMatchInfoWithoutForm(scores_exist) {
		var self = this
		var index = self.props.index

		// needs to be self.props.match_detail[index].player_a_score
		// console.log(self.props.matches_detail)

		return (
			<div>
				<div className="scheduled-matches-container">
					<p className="seed">#{self.props.player_a_rank}</p>
					<p className="player-name">{self.props.player_a_username}</p>
					{ scores_exist ? self.renderScore(self.props.matches_detail[index].player_a_score) : null }
					<p className="seed">vs. #{self.props.player_b_rank}</p>
					<p className="player-name">{self.props.player_b_username}</p>
					{ scores_exist ? self.renderScore(self.props.matches_detail[index].player_b_score) : null }
				</div>
				<p className="header-label match-date">{moment(self.props.matches_detail[self.props.index].match_date).format('ddd, MMM D YYYY, h:mm a')}</p>
			</div>
		)
    }

    render() {
		var self = this
		var index = self.props.index

		let render_matches

		if (self.props.matches_detail[index].player_a_score || self.props.matches_detail[index].player_b_score) {
			render_matches = self.renderMatchInfoWithoutForm(true)
		} else {
			if (self.props.player_a_username == self.props.username || self.props.player_b_username == self.props.username) {
				render_matches = self.renderMatchInfoAndForm()
			} else {
				render_matches = self.renderMatchInfoWithoutForm(false)
			}
		}

		return (
			<li>
				{/*(self.props.player_a_username == self.props.username || self.props.player_b_username == self.props.username) ? self.renderMatchInfoAndForm() : self.renderMatchInfoWithoutForm() */}
				{ self.props && self.props.matches_detail ? render_matches : null }
			</li>
		)
    }
}
export var MatchDetail = listensToClickOutside(_MatchDetail)
export default connect()(MatchDetail)
