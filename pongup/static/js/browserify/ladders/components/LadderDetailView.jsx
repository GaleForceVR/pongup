import * as actions from '../actions'
// import classNames from 'classnames'
import { LaddersList } from './LaddersList'
import React, { Component } from 'react'

export class LadderDetailView extends Component {
    constructor(props) {
        //explicit call to super must remain because of es7 weirdness and class property usage below
        super(props);

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

    render() {
        var self = this
        console.log('%cself.props', 'background:red;color:yellow')
        console.log(self.props)
        return (
            <div>
                <ul>

                    <h5>Ladder:</h5>
                    <h1
                        onClick={()=>{
                            console.log('clicked!')
                            self.props.toggle_open = true
                            // self.setState({
                            //     toggle_open: true
                            // })
                                console.log('new_props')
                            console.log(self.props)
                            console.log(self.state)
                        }}

                    >{self.props.ladder_name}</h1>
                    {/*(self.props.ladders && self.props.ladders.length > 0) ? self.buildLadderList() : null*/}
                </ul>
                <a className="primary homepage-cta" href="#joinLadder">+ Add a ladder</a>
            </div>
        )
    }
}