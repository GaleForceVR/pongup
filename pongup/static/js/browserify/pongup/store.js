import  all_reducers  from './reducers/index'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import thunk from 'redux-thunk'

const createStoreWithMiddleware = applyMiddleware(
    thunk
)(createStore);

export default function configureStore() {
    const combinedReducer = combineReducers(
        Object.assign({},
            all_reducers,
            {routing: routeReducer}
        )
    );

    const store = createStoreWithMiddleware(combinedReducer);


    return store
}
