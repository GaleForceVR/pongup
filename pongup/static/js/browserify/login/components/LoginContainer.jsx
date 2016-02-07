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
        console.log('submitUser')
        console.log(self.props)
        console.log('state')
        console.log(self.state)
        // console.log(self.state)
        self.props.dispatch(
            
            actions.createUser({
                new_user: {
                    username: self.props.new_user.username,
                    is_staff: false,
                    password: self.props.new_user.password,
                    email: self.props.new_user.email
                }
            })
        )
    }

    submitLogin() {
        var self = this

        self.props.dispatch(
            actions.loginUser({
                login_info: {
                    username: self.props.login_info.username,
                    password: self.props.login_info.password
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
        self.props.dispatch(actions.loadUser())
    }

    render() {
        var self = this
        return (
            <div className="login-page">
                <div className="login-form-wrapper">
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={(e)=>{
                            self.props.dispatch(
                                actions.saveToProps({username: e.target.value})
                            )
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Password"
                        onChange={(e)=>{
                            self.props.dispatch(
                                actions.saveToProps({password: e.target.value})
                            )
                        }}
                    />
                    <a
                        className="primary homepage-cta"
                        href="#createUser"
                        onClick={()=>{
                            self.submitLogin()
                        }}
                    >
                    Log in
                    </a>
                </div>
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
                    <input
                        type="text"
                        placeholder="Email"
                        onChange={(e)=>{
                            self.props.dispatch(
                                actions.saveToProps({email: e.target.value})
                            )
                        }}
                    />
                </label>
                <label>Password: 
                    <input
                        type="text"
                        placeholder="Password"
                        onChange={(e)=>{
                            self.props.dispatch(
                                actions.saveToProps({password: e.target.value})
                            )
                        }}
                    />
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