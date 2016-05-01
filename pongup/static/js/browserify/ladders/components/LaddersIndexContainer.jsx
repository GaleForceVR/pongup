import * as actions from '../actions'
import classNames from 'classnames'
import { LaddersList } from './LaddersList'
import React, { Component } from 'react'

export class LaddersIndexContainer extends Component {
    constructor(props) {
        //explicit call to super must remain because of es7 weirdness and class property usage below
        super(props);

        this.state = {
            show_ladder_form: false,
            new_ladder_name: ''
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
        self.props.dispatch(actions.loadLadders())
    }

    buildLadderList() {
        var self = this
        return self.props.ladders.map(function(ladder, index) {
            return (
                <LaddersList
                    key={index}
                    id={ladder.id}
                    name={ladder.name}
                    {...self.props}
                />
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

    handleChange(e) {
        this.setState({new_ladder_name: e.target.value })
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
                    onChange={(e) => {this.handleChange(e)}}
                    onBlur={this.handleBlur()}
                />
                <a
                    className="primary"
                    onClick={(e) => {
                        this.props.dispatch(actions.createLadder(this.state.new_ladder_name, this.props.current_user))
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