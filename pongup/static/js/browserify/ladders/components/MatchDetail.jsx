import * as actions from '../actions'
import classNames from 'classnames'
import React, { Component } from 'react'
import moment from 'moment'
import listensToClickOutside from 'react-onclickoutside/decorator'

export class _MatchDetail extends Component {
    constructor(props) {
        //explicit call to super must remain because of es7 weirdness and class property usage below
        super(props);
        this.state = {
			errors: this.props.errors,
			player_a_score: this.props.player_a_score,
			liked: false
        }

    }

    handleClick() {
		this.setState({liked: !this.state.liked})
    }

    handleChange(e) {	
		console.log('player_a_onChange')
		this.setState({player_a_score: e.target.value})
    }

    handleBlur(e) {
		console.log('player_a_score entered')
		this.props.dispatch(actions.checkValidations('player_a_score', e.target.value))
    }

    componentDidMount() {
		this.forceUpdate()
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
		console.log('handleClickOutside')
		this.props.dispatch(
			actions.saveAndExitEditMode({
				player_a_score: this.state.player_a_score,
				is_editing: false
			})
		)
		this.setState(this.state)
    };

    renderMatchInfoAndForm() {
		var self = this
		console.log('renderMatchInfoAndForm()')
		console.log(self.props)
		console.log('self.props.errors.player_a_score')
		console.log(self.props.errors.player_a_score)
		var index = self.index
		if (self.state) {
			console.log('self.state.errors.player_a_score')
			console.log(self.state)
			console.log(self.state.errors)
		}
		var text = this.state.liked ? 'like' : 'haven\'t liked'
		return (
			<div>
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
					{self.props.errors.player_a_score && <div>{self.props.errors.player_a_score}</div>}
					<input 
						key={index}
						type="text" 
						name="player_a_score"
						placeholder="Score"
						value={this.state.player_a_score}
						onChange={this.handleChange.bind(this)}
						onBlur={this.handleBlur.bind(this)}
						className={classNames({'error': self.props.errors.player_a_score })} 
						/>
					<p className="seed">vs. #{self.props.player_b_rank}</p>
					<p className="player-name">{self.props.player_b_username}</p>
					<input type="text" name="player_b_score" placeholder="Score"/>
				</div>
				<p className="header-label">{moment(self.props.matches_detail[self.props.index].match_date).format('ddd, MMM D YYYY, h:mm a')}</p>
				<a 
					className="primary submit-btn" 
					href="#submit"
					onClick={()=> {
						console.log('submit button clicked!')
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
		console.log('%cMatchDetail', 'background-color:blue;color:yellow')
		console.log('%c ' + self, 'background-color:blue;color:white')
		console.log(self.props)
		return (
			<li>
				{(self.props.player_a_username == self.props.username || self.props.player_b_username == self.props.username) ? self.renderMatchInfoAndForm() : self.renderMatchInfoWithoutForm() }
			</li>
		)
    }
}
export var MatchDetail = listensToClickOutside(_MatchDetail)
