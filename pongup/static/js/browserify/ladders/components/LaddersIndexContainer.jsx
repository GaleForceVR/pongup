import * as actions from '../actions'
import classNames from 'classnames'
import { LaddersList } from './LaddersList'
import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

export class LaddersIndexContainer extends Component {
    constructor(props) {
        //explicit call to super must remain because of es7 weirdness and class property usage below
        super(props);

        this.state = {
            show_ladder_form: false,
            new_ladder_name: '',
            new_ladder_location: '',
            new_ladder_start_date: null,
            new_ladder_end_date: null,
            start_date_picked: false
        }

        this.handleStartChange = this.handleStartChange.bind(this)
        this.handleNewLadderClick = this.handleNewLadderClick.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleLocationChange = this.handleLocationChange.bind(this)
        this.handleStartChange = this.handleStartChange.bind(this)
        this.handleEndChange = this.handleEndChange.bind(this)
        this.handleBlur = this.handleBlur.bind(this)

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
    }

    buildLadderList() {
        var self = this
        return self.props.ladders.map(function(ladder, index) {
            return (
                <span>
                    {/* in production, ladder.id == 1 will be the 'global' ladder */}
                    {/* ladder 1 is the default ladder used for friendly matches */}
                    {ladder.id != 0 ?
                        <LaddersList
                            key={index}
                            id={ladder.id}
                            name={ladder.name}
                            {...self.props}
                        />
                    :
                        null
                    }
                </span>
            )
        })
    }

    getLadders() {
        var all_ladders = self.props.ladders.map(
            (ladder)=>{ return (ladder.id) }
        )
    }

    handleNewLadderClick() {
        this.setState({show_ladder_form: true})
    }

    handleNameChange(e) {
        this.setState({new_ladder_name: e.target.value })
    }

    handleLocationChange(e) {
        this.setState({new_ladder_location: e.target.value})
    }

    handleStartChange(date) {
        this.setState({new_ladder_start_date: date, start_date_picked: true})
    }

    handleEndChange(date) {
        this.setState({new_ladder_end_date: date})
    }

    handleBlur() {
        console.log('handleBlur()')

    }

    renderLadderForm() {
        return (
            <form className="create-ladder-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Ladder Name"
                    value={this.state.new_ladder_name}
                    onChange={(e) => {this.handleNameChange(e)}}
                    onBlur={this.handleBlur()}
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location (optional)"
                    value={this.state.new_ladder_location}
                    onChange={(e) => {this.handleLocationChange(e)}}
                    onBlur={this.handleBlur()}
                />
                <div className="datepicker-container" >
                    <DatePicker 
                        name="start_date"
                        placeholderText="Start Date"
                        minDate={moment()}
                        selected={this.state.new_ladder_start_date}
                        onChange={this.handleStartChange}
                    />
                </div>
                
                    <DatePicker 
                        name="end_date"
                        placeholderText="End Date"
                        minDate={this.state.new_ladder_start_date}
                        // disabled={!this.state.start_date_picked}
                        selected={this.state.new_ladder_end_date}
                        onChange={this.handleEndChange}
                    />
                
                <a
                    className="primary"
                    onClick={(e) => {
                        this.props.dispatch(actions.createLadder(this.state.new_ladder_name, this.props.current_user, this.state.new_ladder_location, this.state.new_ladder_start_date, this.state.new_ladder_end_date))
                    }}
                >Create ladder</a>
            </form>
        )
    }

    render() {
        var self = this
        // var all_ladders = self.props.ladders.map(
        //             (ladder)=>{ return (ladder.id) }
        //         )
        // console.log('all_ladders')
        // console.log(all_ladders)

        return (
            <div className="container-1600">

                <div className="ladder-detail-header">
                    <p className="header-label ladder-list">Ladders:</p>
                    <p className="header-label ladder-management-message">Click on a ladder to see who's playing, see match scores, or request to join the league.</p>      
                </div>

                <div className="right-wrapper">
                    <a 
                        className={classNames("primary", { 'hide-element': self.state.show_ladder_form} )}
                        onClick={(e) => {
                            self.handleNewLadderClick()
                        }}
                    >Start a new ladder</a>
                    { self.state.show_ladder_form ? self.renderLadderForm() : null }
                </div>

                <div className="left-wrapper">
                    <ul className="scheduled-matches-list">
                        {(self.props.ladders && self.props.ladders.length > 0) ? self.buildLadderList() : null}
                    </ul>
                </div>
            </div>
        )
    }
}