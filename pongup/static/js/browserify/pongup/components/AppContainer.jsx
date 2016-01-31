import * as actions from '../actions'
import classNames from 'classnames'
import React, { Component } from 'react'
import { PongupHomeContainer } from '../../pongup_home/components/PongupHomeContainer'


export class AppContainer extends Component {
    constructor(props) {
        //explicit call to super must remain because of es7 weirdness and class property usage below
        super(props);

        console.log('props')
        console.log(props)
    }

    componentDidMount() {
        var self = this;
        
        self.props.dispatch(actions.loadUserData())
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
        console.log('bingo')
        console.log(self.props)
        console.log(self.props.username)
        console.log(self.props.active_app)
        // var displayNone = { display: 'none' }
        return (
            <span>
                {!self.props.is_loading ? this.props.children : self.loading()}
                <ul>
                    <li>
                        <a className={
                                classNames (
                                    'left-nav-links',
                                    'no-class'
                                )

                            }
                            onClick={
                                ()=>{
                                    console.log('Sign up clicked')
                                    self.props.dispatch(
                                        actions.handleTabSelect('sign-up')
                                    )
                                }
                            }
                        >
                        Sign up
                        </a>
                    </li>
                    <li>
                        <a
                            onClick={
                                ()=>{
                                    console.log('Log in clicked')
                                    self.props.dispatch(
                                        actions.handleTabSelect('log-in')
                                    )
                                }
                            }
                        >
                        Log in
                        </a>
                    </li>
                </ul>
            </span>
        )
    }
}



