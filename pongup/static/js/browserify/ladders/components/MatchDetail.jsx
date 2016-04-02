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
			errors: this.props.errors,
			player_a_score: this.props.player_a_score,
			player_b_score: this.props.player_b_score,
			match_id: this.props.match_id,
			liked: false,
        }

    }

    handleSubmit(e, index) {
		console.log('%csubmit button clicked!', 'background-color:red;color:yellow')
		console.log(this.state)
		console.log(this.props.match)
		console.log(this.props.match.id)
		console.log('%cindex', 'background-color:pink')
		console.log(index)
		this.props.dispatch(actions.submitScores(this.props.match.id, index))
    }

    handleClick() {
		this.setState({liked: !this.state.liked})
    }

    handleChange(e) {	
		var score_obj = {}
		var player = e.target.name
		var score = e.target.value

		score_obj[player] = score

		this.setState(score_obj)
    }

    handleBlur(e) {
		var self = this
		var player = e.target.name
		console.log('handleBlur')
		console.log(self)

		console.log(player)
		var score = e.target.value
		var index = self.props.index
		console.log(score)
		self.props.dispatch(actions.checkValidations(player, score, index))
		console.log('handleBlurErrors: ')
		console.log(self.state)
		console.log(self.state.errors)
		console.log('index')
		console.log(index)
		console.log(self.state.errors[index])
		// console.log(this.state.errors[index].player_a_score)
    }

    componentDidMount() {
		this.forceUpdate()
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps){
		if (nextProps.force_update != this.props.force_update) {
			this.forceUpdate()
			this.setState(this.state)
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
				player_a_score: this.state.player_a_score,
				player_b_score: this.state.player_b_score,
				errors: this.state.errors,
				is_editing: false
			})
		)
		this.setState(this.state)
    };

    renderMatchInfoAndForm() {
		var self = this
		var index = self.index
		var text = this.state.liked ? 'like' : 'haven\'t liked'
		return (
			<div className={classNames({'force-update': self.props.force_update})}>
				<div 
					className="scheduled-matches-container"
					
					>
					<p
						onClick={this.handleClick.bind(this)}
						>
						You {text} this. Click to toggle.
					</p>
					<p className="seed">#{self.props.player_a_rank}</p>
					<p className="player-name">{self.props.player_a_username}</p>
					{self.props.errors && self.props.errors[index] && self.props.errors[index].player_a_score && <div>{self.props.errors[index].player_a_score}</div>}
					<input 
						
						type="text" 
						name="player_a_score"
						placeholder="Score"
						value={this.state.player_a_score}
						onChange={this.handleChange.bind(this)}
						onBlur={this.handleBlur.bind(this)}
						className={classNames({'error': (this.state.errors && this.state.errors[index] && this.state.errors[index].player_a_score) })} 
						/>
					<p className="seed">vs. #{self.props.player_b_rank}</p>
					<p className="player-name">{self.props.player_b_username}</p>
					{self.props.errors && self.props.errors[index] && self.props.errors[index].player_b_score && <div>{self.props.errors[index].player_b_score}</div>}
					<input 

						type="text" 
						name="player_b_score" 
						placeholder="Score"
						value={this.state.player_b_score}
						onChange={this.handleChange.bind(this)}
						onBlur={this.handleBlur.bind(this)}
						className={classNames({'error': (this.props.errors && this.props.errors[index] && this.props.errors[index].player_b_score)})}
						/>
				</div>
				<p className="header-label">{moment(self.props.matches_detail[self.props.index].match_date).format('ddd, MMM D YYYY, h:mm a')}</p>
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

    renderMatchInfoWithoutForm() {
		var self = this
		return (
			<div>
				<div className="scheduled-matches-container">
					<p className="seed">#{self.props.player_a_rank}</p>
					<p className="player-name">{self.props.player_a_username}</p>
					<p className="seed">vs. #{self.props.player_b_rank}</p>
					<p className="player-name">{self.props.player_b_username}</p>
				</div>
				<p className="header-label">{moment(self.props.matches_detail[self.props.index].match_date).format('ddd, MMM D YYYY, h:mm a')}</p>
			</div>
		)
    }

    render() {
		var self = this
		return (
			<li>
				{(self.props.player_a_username == self.props.username || self.props.player_b_username == self.props.username) ? self.renderMatchInfoAndForm() : self.renderMatchInfoWithoutForm() }
			</li>
		)
    }
}
export var MatchDetail = listensToClickOutside(_MatchDetail)
export default connect()(MatchDetail)
