import * as actions from '../actions'
// import classNames from 'classnames'
import React, { Component } from 'react'
import classNames from 'classNames'
import ReactTooltip from 'react-tooltip'
import moment from 'moment'
// import TimePicker from 'rc-time-picker'
import TimePicker from 'react-time-picker'
import DatePicker from 'react-datepicker'
import Select from 'react-select'

export class RankingList extends Component {
	constructor(props) {
		//explicit call to super must remain because of es7 weirdness and class property usage below
		super(props);
        this.state = {
            show_schedule_match_form: false,
            schedule_challenge_match: false,
            match_time: moment().format('h:mm a'),
            match_date: moment(),
            match_hour: '12',
            match_min: '00',
            match_am: 'am'
        }

        this.handleDateChange = this.handleDateChange.bind(this)
        this.scheduleMatch = this.scheduleMatch.bind(this)
	}

    handleChange(e, index) {
        // this.props.user_ladder_id
        this.props.dispatch(actions.setNewRankings(index, e.target.value))
    }

    handleBlur(e, index) {
        this.props.dispatch(actions.checkValidations(e.target.name, e.target.value, index))
    }

    handleApprovalClick(e) {
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
        if (this.props.new_rankings[index].ladder_rank && this.props.rankings_updated) {
            rank = this.props.rank
        }

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

    onChange(match_time) {
        let match_date = this.state.match_date
        this.setState({match_time: match_time})
        this.props.dispatch(actions.updateMatchDate(match_date, match_time))
    }

    handleDateChange(match_date) {
        let match_time = this.state.match_time
        this.setState({match_date: match_date})
        // this.props.dispatch(actions.updateMatchDate(match_date, match_time))
    }

    scheduleMatch(date, hour, min, am, champion_name, challenger_name, champion_rank, challenger_rank) {
        console.log('scheduleMatch()')
        // console.log('ladder_id: ' + this.props)
        console.log(this.props)
        // let date = this.state.match_date
        // let hour = this.state.match_hour
        // let min = this.state.match_min
        // let am = this.state.match_am
        // this.props.dispatch(actions.scheduleMatch(date, hour, min, am, champion_name, challenger_name, champion_rank, challenger_rank))
    }

    renderMatchSchedulerForm(is_challenge_match) {
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
            <form className="create-match-form">
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
                <a
                    className="edit-btn cta submit"
                    onClick={()=>{
                        let date = this.state.match_date
                        let hour = this.state.match_hour
                        let min = this.state.match_min
                        let am = this.state.match_am
                        let champion_name = this.props.player_name
                        let challenger_name = this.props.username
                        let champion_rank = this.props.rank
                        let challenger_rank = this.props.current_user_rank
                        let ladder_id = this.props.params.ladder_id
                        this.props.dispatch(actions.scheduleMatch(date, hour, min, am, champion_name, challenger_name, champion_rank, challenger_rank, ladder_id, is_challenge_match))
                    }}
                >Submit challenge</a>
            </form>
        )
    }

    renderMatchSchedulerButton() {

        const rank = this.props.rank
        const current_user_rank = this.props.current_user_rank
        const current_username = this.props.username

        const ranked_player_name = this.props.player_name
        const current_time = moment()

        let challenge_match_scheduled = false

        for (var i = 0; i < this.props.matches_detail.length; i++) {
            let match = this.props.matches_detail[i]

            if (match.is_challenge_match) {
                if (ranked_player_name == match.player_a.username || ranked_player_name == match.player_b.username) {
                    if (current_username == match.player_a.username || current_username == match.player_b.username) {
                        if (moment(match.match_date) > current_time && !(match.player_a_score || match.player_b_score)) {
                            challenge_match_scheduled = true
                        }
                    }
                }
            }
        }

        return (
            <span>
                { (rank < current_user_rank && rank >= current_user_rank - 2 && !challenge_match_scheduled) ? 
                        <span>
                            <a
                                className="schedule-btn challenge"
                                data-tip="schedule a CHALLENGE match"
                                data-for="challenge-match"
                                onClick={(e)=>{
                                    this.handleScheduleMatchClick(e, 'challenge')
                                    this.setState({show_schedule_match_form: true, schedule_challenge_match: true})
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
                                             this.setState({show_schedule_match_form: true, schedule_challenge_match: false})
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

        return (
			<li className="ladder-rank-list">
                {self.renderRanking()}
                <a href="#" >
                    <p className="name">{self.props.player_name}</p>
                </a>
                {self.props.is_manager && !self.props.approved ? self.renderApprovalButton() : (!self.props.approved ? self.renderApprovalPending() : self.renderMatchSchedulerButton())}
                {self.state.show_schedule_match_form ? self.renderMatchSchedulerForm(this.state.schedule_challenge_match) : null }
			</li>
        )
    }
}