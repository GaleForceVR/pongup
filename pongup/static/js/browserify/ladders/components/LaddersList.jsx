import * as actions from '../actions'
import classNames from 'classnames'
import React, { Component } from 'react'

var counter = 0

export class LaddersList extends Component {
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
        var data = self.props
        var index = data.key
        // var open_arr = self.props.open

        var detail_url = "/ladders/" + data.id

        console.log('LaddersList')
        console.log(data)
        console.log(detail_url)
        console.log(self.state)
        console.log(self.props)
        console.log('%cThis IS IT', 'background-color:pink')
  //       var open = [
		// 	...open_arr.slice(0, index),
		// 	false,
		// 	...open_arr.slice(index + 1)
		// ]
        // console.log(this.props.open)

        
		// }

        // (!self.props.is_loading ?  :)

        // self.props.dispatch(actions.createOpenState(index, is_open))

        // var hiddenClasses = "primary upgrade-button"
        // var visibleClasses = hiddenClasses + " active"
        // var upgradeButtonClasses = data.offer_upgrade ? visibleClasses : hiddenClasses

        // var editLink = "/venues/edit/" + data.id + "/basic-info"
        // var upgradeLink = "/venues/edit/" + data.id + "/pick-your-plan"

        return (
			<li
				className={classNames("seen message-detail template", {'open': this.props.open})}
				key={index}
				onClick={()=>{
					console.log('CLICK')
                    console.log(this.props)

                    self.props.dispatch(actions.updateOpenState(index, this.props.open))
                    

                    // console.log(this.props.open[index])
                    // this.props.open[index] = !this.props.open[index]
                    // console.log('this one:')
                    // console.log(this.props.open)
                    // var open_arr = this.props.open
                    // var open = [
                    //     ...open_arr.slice(0, index),
                    //     !this.props.open[index],
                    //     ...open_arr.slice(index + 1)
                    // ]
                    // this.setProps({open: open})
                    // this.forceUpdate()
                    // console.log(this.props.open)
                    // // this.forceUpdate()
                    // console.log(this.props)
                    // console.log('END CLICK')
				}}
			>
				<h1>
					<a>{data.name}</a>
				</h1>
				<h5>{data.id}</h5>
			</li>
        )
    }
}