import * as actions from '../actions'
import classNames from 'classnames'
import React, { Component } from 'react'


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
        return (
            <div className="awesome">
                <h1>{self.props.username}</h1>
            </div>
        )
    }
}



