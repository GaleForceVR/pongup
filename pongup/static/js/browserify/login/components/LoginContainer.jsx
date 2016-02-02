import * as actions from '../actions'
// import classNames from 'classnames'
import React, { Component } from 'react'

export class LoginContainer extends Component {
    constructor(props) {
        //explicit call to super must remain because of es7 weirdness and class property usage below
        super(props);

    }

    submitUser() {
        var self = this
        // console.log('%csubmitUser', 'background-color:blue;color:yellow')
        // console.log(self)
        // console.log(self.props)

        self.props.dispatch(
            
            actions.createUser({
                new_user_info: {
                    username: self.props.username,
                    is_staff: self.props.is_staff,
                    password: self.props.password,
                    email: self.props.email
                }
            })
        )
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
        console.log('%cLoginContainer componentDidMount', 'background-color:blue')
        console.log(self)
        console.log(self.props)
        self.props.dispatch(actions.loadUser())
    }

    render() {
        var self = this
        console.log('%cLoginContainer', "background-color:yellow")
        console.log(self.props)
        return (
            <div className="login-page">
                <label>Username: 
                    <input
                        type="text"
                        placeholder="Display Name"
                        onChange={(e)=>{
                            self.props.dispatch(
                                actions.saveToProps({username: e.target.value})
                            )
                        }}
                    />
                </label>
                <label>Email: 
                    <input type="text" placeholder="Email" />
                </label>
                <label>Password: 
                    <input type="text" placeholder="Password" />
                </label>
                <a
                    className="primary homepage-cta"
                    href="#createUser"
                    onClick={()=>{
                        self.submitUser()
                    }}
                >

                Submit
                </a>
            </div>
        )
    }
}