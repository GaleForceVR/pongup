import * as constants from '../pongup/constants'

const initialState = {
    active_tab: 'ladders',
    is_loading: true,
    user_profile: {},
    ladders: [],
    open: false,
    counter: []
}

const ladders_reducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.INCREMENT:
            console.log('counter')
            console.log(state.counter + 1)
            return Object.assign({}, state, {
                counter: state.counter + 1
            })
        case constants.DECREMENT:
            return Object.assign({}, state, {
                counter: state.counter - 1
            })
        case constants.ADD_COUNTER:
            return Object.assign({}, state, {
                counter: [...state.counter, 0]
            })
        case constants.REMOVE_COUNTER:
            return Object.assign({}, state, {
                counter: [
                    ...state.counter.slice(0, action.index),
                    ...state.counter.slice(action.index + 1)
                ]
            })
        case constants.INCREMENT_COUNTER:
            return Object.assign({}, state, {
                counter: [
                    ...state.counter.slice(0, action.index),
                    state.counter[action.index] + 1,
                    ...state.counter.slice(action.index + 1)
                ]
            })
        case constants.DECREMENT_COUNTER:
            return Object.assign({}, state, {
                counter: [
                    ...state.counter.slice(0, action.index),
                    state.counter[action.index] - 1,
                    ...state.counter.slice(action.index + 1)
                ]
            })
        case constants.LADDERS_ACTIVE:
            return Object.assign({}, state, {
                // message_data: action.new_state.message_data,
                is_loading: action.is_loading,
                active_tab: action.active_tab
            })
        case constants.LADDER_DATA_LOADED:
            return Object.assign({}, state, {
                ladders: action.ladder_data.ladders_data,
                is_loading: false
            })
        case constants.CREATE_OPEN_STATE:
            // var open_arr = action.arr
            console.log('CREATE_OPEN_STATE')
            console.log(action.arr)
            // console.log(action.selfy.props.open)
            // var temp_arr = [
            //     ...action.selfy.props.open.slice(0, action.index),
            //     action.open,
            //     ...action.selfy.props.open.slice(action.index + 1)
            // ]
            // console.log(temp_arr)
            // return [
            //     ...action.selfy.props.open.slice(0, action.index),
            //     action.open,
            //     ...action.selfy.props.open.slice(action.index + 1)
            // ]
            // console.log(new_open_arr)
            return Object.assign({}, state, {
                type: action.type,
                id: action.index,
                open: false
            })
        case constants.TOGGLE_OPEN_STATE:
            return Object.assign({}, state, {
                type: action.type,
                id: action.index,
                open: !action.open
            })
        default:
            return state;
    }
}

export default ladders_reducer;