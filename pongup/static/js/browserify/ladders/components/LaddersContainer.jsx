import * as actions from '../actions'
// import classNames from 'classnames'
import { LaddersList } from './LaddersList'
import React, { Component } from 'react'

const Counter = ({
    key_index,
    value,
    onIncrement,
    onDecrement,
    onRemove
}) => (
    <div>
        <hr/>
        <button onClick={onIncrement}>+</button>
        <h5>{key_index}</h5>
        <h1>{value[key_index]}</h1>
        <button onClick={onDecrement}>-</button>
        <button onClick={onRemove}>Remove counter</button>
    </div>
)

// const CounterTwo = ({
//     value,
//     onIncrement,
//     onDecrement
// }) => (
//     <span>
//     <button 
//         onClick={()=>{
//             console.log('h1 clicked')
//             self.props.dispatch(actions.increment())
//         }}
//     >
//         +
//     </button>
//     <h5 className="display-number">{self.props.counter}</h5>
//     <button 
//         onClick={()=>{
//             console.log('h1 clicked')
//             self.props.dispatch(actions.decrement())
//         }}
//     >
//         -
//     </button>
//     </span>
// )

export class LaddersContainer extends Component {
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

    componentDidMount() {
        var self = this
        self.props.dispatch(actions.loadLadders())
    }

    buildCounters() {
        var self = this
        return self.props.counter.map(function(countme, index) {
            console.log('buildCounters')
            console.log(index)
            return (
                <Counter 
                    key={index}
                    key_index={index}
                    value={self.props.counter}
                    onIncrement={() =>
                        self.props.dispatch(actions.incrementCounter(index))
                    }
                    onDecrement={() =>
                        self.props.dispatch(actions.decrementCounter(index))
                    }
                    onRemove={() => 
                        self.props.dispatch(actions.removeCounter(index))
                    }
                />
            )
        })
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

    render() {
        var self = this
        console.log('this is crazy')
        console.log(self.props)
        console.log(self.props.ladders)
        var all_ladders = self.props.ladders.map(
                    (ladder)=>{ return (ladder.id) }
                )
        console.log('all_ladders')
        console.log(all_ladders)

        return (
            <div>
                <ul>
                    {(self.props.counter && self.props.counter.length > 0) ? self.buildCounters() : null}
                </ul>
                <button 
                    onClick={()=> {
                        self.props.dispatch(actions.addCounter())
                    }}
                />
                
                {!self.props.is_loading ? this.props.children : self.loading()}
            </div>
        )
    }
}