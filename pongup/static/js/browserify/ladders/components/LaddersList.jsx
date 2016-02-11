import * as actions from '../actions'
// import classNames from 'classnames'
import React, { Component } from 'react'

export class LaddersList extends Component {
	constructor(props) {
		//explicit call to super must remain because of es7 weirdness and class property usage below
		super(props);
	}
    render() {
        var self = this
        var data = self.props

        var detail_url = "/ladders/" + data.id

        console.log('LaddersList')
        console.log(data)
        console.log(detail_url)

        // var hiddenClasses = "primary upgrade-button"
        // var visibleClasses = hiddenClasses + " active"
        // var upgradeButtonClasses = data.offer_upgrade ? visibleClasses : hiddenClasses

        // var editLink = "/venues/edit/" + data.id + "/basic-info"
        // var upgradeLink = "/venues/edit/" + data.id + "/pick-your-plan"

        return (
			<li>
				<h1><a href={detail_url} >{data.name}</a></h1>
				<h5>{data.id}</h5>
			</li>
        )
    }
}