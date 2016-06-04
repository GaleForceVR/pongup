import * as actions from '../actions'
import classNames from 'classnames'
import React, { Component } from 'react'
import moment from 'moment'
import listensToClickOutside from 'react-onclickoutside/decorator'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import Select from 'react-select'

export class _MatchDetail extends Component {
    constructor(props) {
        //explicit call to super must remain because of es7 weirdness and class property usage below
        super(props);
        this.state = {
			// errors: this.props.errors,
			// player_a_score: this.props.player_a_score,
			// player_b_score: this.props.player_b_score,
			match_id: this.props.match_id,
			reschedule_match: false,
			match_time: moment().format('h:mm a'),
            match_date: moment(),
            match_hour: '12',
            match_min: '00',
            match_am: 'am'
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
        this.handleClickOutside = this.handleClickOutside.bind(this)
        this.renderMatchInfoAndForm = this.renderMatchInfoAndForm.bind(this)
        this.renderMatchInfoWithoutForm = this.renderMatchInfoWithoutForm.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)

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

    renderAcceptedMatch() {

    }

    renderMatchAcceptanceForm() {

    }

    renderMatchInfoWithoutForm(scores_exist, accepted=true, reschedule_needs_approval=false) {
		var self = this
		var index = self.props.index

		let show_buttons = false
		let pending_match = false

		if (this.props.username == this.props.player_b_username && !accepted && reschedule_needs_approval) {
			show_buttons = true
		} else if (this.props.username == this.props.player_a_username && !accepted) {
			show_buttons = true
		} else if (!accepted) {
			pending_match = true
		}

		return (
			<div>
				<div className="scheduled-matches-container">
					<div className="player-a-container">
						<p className="seed">#{self.props.player_a_rank}</p>
						<p className="player-name">{self.props.player_a_username}</p>
						<div className="score-container">
							{ scores_exist ? self.renderScore(self.props.matches_detail[index].player_a_score) : null }
						</div>
					</div>
					<div className="vs-container">
						{ scores_exist ? <p className="dash">-</p> : <p className="vs">vs.</p> }
					</div>
					<div className="player-b-container">
						<div className="score-container">
							{ scores_exist ? self.renderScore(self.props.matches_detail[index].player_b_score) : null }
						</div>
						<p className="seed"> #{self.props.player_b_rank}</p>
						<p className="player-name">{self.props.player_b_username}</p>
					</div>
				</div>
				<div className="match-date-container">
					{ this.state.reschedule_match ? this.renderAlternateDateForm() : this.renderDate() }
					{ pending_match ? <div className="pending-match">Approval pending</div> : null }
				</div>
				{ show_buttons ? self.renderAcceptanceButtons() : null }
			</div>
		)
    }

    renderMatchInfoAndForm() {
		var self = this
		var index = self.props.index
		// var text = this.state.liked ? 'like' : 'haven\'t liked'
		return (
			<div className={classNames({'force-update': self.props.force_update})}>
				<div className="scheduled-matches-container">
					<div className="player-a-container">
						<p className="seed">#{self.props.player_a_rank}</p>
						<p className="player-name no-margin">{self.props.player_a_username}</p>
						{self.props.errors && self.props.errors[index] && self.props.errors[index].player_a_score && <div>{self.props.errors[index].player_a_score}</div>}
						<input 
							type="text" 
							name="player_a_score"
							placeholder="Score"
							value={this.props.player_a_score[index]}
							onChange={this.handleChange.bind(this)}
							onBlur={this.handleBlur.bind(this)}
							className={classNames("score", {'error': (this.props.errors && this.props.errors[index] && this.props.errors[index].player_a_score) })} 
							/>
					</div>
					<div className="vs-container">
						<p className="dash score-entry">-</p>
					</div>
					<div className="player-b-container">
						<input 
							type="text" 
							name="player_b_score" 
							placeholder="Score"
							value={this.props.player_b_score[index]}
							onChange={this.handleChange.bind(this)}
							onBlur={this.handleBlur.bind(this)}
							className={classNames({'error': (this.props.errors && this.props.errors[index] && this.props.errors[index].player_b_score)})}
							/>
						<p className="seed no-margin"> #{self.props.player_b_rank}</p>
						<p className="player-name">{self.props.player_b_username}</p>
						{self.props.errors && self.props.errors[index] && self.props.errors[index].player_b_score && <div>{self.props.errors[index].player_b_score}</div>}
					</div>
				</div>
				<div className="match-date-container">
					<p className="header-label match-date">{moment(self.props.matches_detail[self.props.index].match_date).format('ddd, MMM D YYYY, h:mm a')}</p>
				</div>
				<div className="submit-scores-button-container">
					<a 
						className="submit-btn cta" 
						href="#submit"
						onClick={(e)=> {
							this.handleSubmit(e, self.props.index)
						}}
						>
						Submit scores
					</a>
				</div>
			</div>
		)
    }

    renderScore(score) {
		return(
			<p className="player-score">{score}</p>
		)
    }

    handleAcceptMatch(e, index) {
    	console.log('acceptMatch')
    	console.log(e)
    	console.log(index)
    	this.props.dispatch(actions.acceptChallenge(this.props.match.id, this.props.match.match_date))
    }

    handleRescheduleSubmit() {
    	console.log('handleRescheduleSubmit')
    }

    toggleRescheduleButton() {
    	this.setState({reschedule_match: !this.state.reschedule_match})
    }

    handleDateChange(match_date) {
        // let match_time = this.state.match_time
        this.setState({match_date: match_date})
        console.log(this.state.match_date)
        // this.props.dispatch(actions.updateMatchDate(match_date, match_time))
    }

    renderAlternateDateForm() {
    	console.log('%crenderMatchSchedulerForm', 'background-color:yellow;color:red')
        console.log(this.state.match_date)
        console.log(this.props)
        let hour_options = [
            {value: '1', label: ' 1'},
            {value: '2', label: ' 2'},
            {value: '3', label: ' 3'},
            {value: '4', label: ' 4'},
            {value: '5', label: ' 5'},
            {value: '6', label: ' 6'},
            {value: '7', label: ' 7'},
            {value: '8', label: ' 8'},
            {value: '9', label: ' 9'},
            {value: '10', label: '10'},
            {value: '11', label: '11'},
            {value: '12', label: '12'}
        ]

        let min_options = [
            {value: '00', label: '00'},
            {value: '05', label: '05'},
            {value: '10', label: '10'},
            {value: '15', label: '15'},
            {value: '20', label: '20'},
            {value: '25', label: '25'},
            {value: '30', label: '30'},
            {value: '35', label: '35'},
            {value: '40', label: '40'},
            {value: '45', label: '45'},
            {value: '50', label: '50'},
            {value: '55', label: '55'}
        ]

        let am_options = [
            {value: 'am', label: 'am'},
            {value: 'pm', label: 'pm'}
        ]

        return (
            <form className="update-match-date-form">
                <div className="datepicker-container match-scheduler-date-adjust">
                    <DatePicker 
                        className="match-date"
                        name="match_date"
                        placeholderText="Match Date"
                        minDate={moment()}
                        selected={this.state.match_date}
                        onChange={this.handleDateChange}
                        dateFormat="M/D/YYYY"
                    />
                </div>
                {/*<input
                    className="match-date"
                    type="text"
                    name="match_date"
                />*/}
                <div className="timepicker-container" style={{'position': 'relative'}}>
                    <Select 
                        simpleValue
                        name="match_hour"
                        className="match-hour-picker"
                        clearable={false}
                        options={hour_options}
                        placeholder={'0'}
                        onChange={(val)=>{
                            this.setState({match_hour: val})
                        }}
                        // onBlur={()=>{

                        // }}
                        value={this.state.match_hour}
                        searchable={false}
                    />
                    <span className="time-separator">:</span>
                    <Select 
                        simpleValue
                        name="match_min"
                        className="match-min-picker"
                        clearable={false}
                        options={min_options}
                        placeholder={'0'}
                        onChange={(val)=>{
                            this.setState({match_min: val})
                        }}
                        // onBlur={()=>{

                        // }}
                        value={this.state.match_min}
                        searchable={false}
                    />
                    <Select 
                        simpleValue
                        name="match_am"
                        className="match-am-picker"
                        clearable={false}
                        options={am_options}
                        placeholder={'0'}
                        onChange={(val)=>{
                            this.setState({match_am: val})
                        }}
                        // onBlur={()=>{

                        // }}
                        value={this.state.match_am}
                        searchable={false}
                    />    

                    {/*<TimePicker 
                        style={{padding: '2px', border: 'none'}}
                        value={this.state.match_time}
                        onChange={(e)=>{this.onChange(e)}}
                        format="h:mm a"
                    />*/}
                </div>
            </form>
        )
    }

    renderDate() {
    	var self = this
    	return(
    		<p className="header-label match-date">{moment(self.props.matches_detail[self.props.index].match_date).format('ddd, MMM D YYYY, h:mm a')}</p>
    	)
    }

    renderAcceptanceButtons() {
    	return(
    		<div className="acceptance-button-container">
    			<a 
    				className="submit-btn cta" 
    				href="#accept"
    				onClick={(e)=> {
    					if (this.state.reschedule_match) {
    						// this.handleRescheduleSubmit(e, self.props.index)
    						
    					    let date = this.state.match_date
    					    let hour = this.state.match_hour
    					    let min = this.state.match_min
    					    let am = this.state.match_am
    					    let match_id = this.props.match.id
    					    let orig_date = this.props.match.match_date
    					    // let champion_name = this.props.player_name
    					    // let challenger_name = this.props.username
    					    // let champion_rank = this.props.rank
    					    // let challenger_rank = this.props.current_user_rank
    					    // let ladder_id = this.props.params.ladder_id
    					    this.props.dispatch(actions.rescheduleMatch(date, hour, min, am, match_id, orig_date/*, champion_name, challenger_name, champion_rank, challenger_rank, ladder_id*/))
    						
    					} else {
    						console.log('click')
    						console.log(this.props)
    						this.handleAcceptMatch(e, this.props.index)
    					}
    				}}
    				>
    				{ this.state.reschedule_match ? 'Submit' : 'Accept challenge' }
    			</a>
    			<a 
    				className="submit-btn secondary" 
    				href="#submit"
    				onClick={(e)=> {
    					// this.handleRescheduleSubmit(e, self.props.index)
    					this.toggleRescheduleButton()
    				}}
    				>
    				{ this.state.reschedule_match ? 'Cancel' : 'Reschedule' }
    			</a>
    		</div>
    	)
    }

    render() {
		var self = this
		var index = self.props.index

		let render_matches
		console.log('MatchDetail render()')
		console.log(this.props)

		// if (this.props.matches_loaded)

		if (this.props.matches_detail[index].player_a_score || this.props.matches_detail[index].player_b_score) {
			render_matches = this.renderMatchInfoWithoutForm(true)
		} else {
			if (this.props.match.accepted && (this.props.player_a_username == this.props.username || this.props.player_b_username == this.props.username)) {
				console.log('%cBINGO', 'background-color:pink;color:blue;font-size:60px')
				render_matches = this.renderMatchInfoAndForm() 
			} else if (!this.props.match.accepted && (this.props.player_a_username == this.props.username || this.props.player_b_username == this.props.username)) { 
				// render_matches = this.renderMatchAcceptanceForm()
				console.log('caught')
				console.log(this.props.alternate_date)
				console.log((this.props.username == this.props.player_b_username) && this.props.alternate_date)
				let reschedule_needs_approval = false
				if ((this.props.username == this.props.player_b_username) && this.props.alternate_date) {
					reschedule_needs_approval = true
				}
				console.log(this.props.player_b_username)
				console.log(reschedule_needs_approval)
				render_matches = this.renderMatchInfoWithoutForm(false, false, reschedule_needs_approval)
			} else {
				render_matches = this.renderMatchInfoWithoutForm(false)
			}
		}

		return (
			<li>
				{/*(self.props.player_a_username == self.props.username || self.props.player_b_username == self.props.username) ? self.renderMatchInfoAndForm() : self.renderMatchInfoWithoutForm() */}
				{ this.props && this.props.matches_detail ? render_matches : null }
			</li>
		)
    }
}
export var MatchDetail = listensToClickOutside(_MatchDetail)
export default connect()(MatchDetail)
