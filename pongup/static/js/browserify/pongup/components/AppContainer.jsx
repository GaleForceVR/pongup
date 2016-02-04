import * as actions from '../actions'
import classNames from 'classnames'
import React, { Component } from 'react'
import { PongupHomeContainer } from '../../pongup_home/components/PongupHomeContainer'


export class AppContainer extends Component {
    constructor(props) {
        //explicit call to super must remain because of es7 weirdness and class property usage below
        super(props);
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



