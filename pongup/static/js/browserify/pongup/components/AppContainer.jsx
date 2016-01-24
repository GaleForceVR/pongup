import * as actions from '../actions'
import classNames from 'classnames'
import React, { Component } from 'react'


export class AppContainer extends Component {
    constructor(props) {
        //explicit call to super must remain because of es7 weirdness and class property usage below
        super(props);

        console.log('props')
    }

    componentDidMount() {
        var self = this;
        console.log('componentDidMount')
        
        self.props.dispatch(actions.loadUserData())
    }

    loading() {
        console.log('AppContainer.jsx')
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
        console.log(self.props)
        return (
            <div className="awesome">
                <h1>Hello PONGup World!</h1>
            </div>
        )
    }
}



