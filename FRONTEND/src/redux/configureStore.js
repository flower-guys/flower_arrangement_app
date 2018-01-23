import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import { composeWithDevTools } from 'redux-devtools-extension'
import { i18nState } from 'redux-i18n'
import user from 'redux/modules/user'
import flowers from 'redux/modules/flowers'
import layout from 'redux/modules/layout'
import message from 'redux/modules/message'

const env = process.env.NODE_ENV

const history = createHistory()

const middlewares = [thunk, routerMiddleware(history)]

let store
if(env === 'development') {
    const { logger } = require('redux-logger')
    middlewares.push(logger)
    store = initialState => createStore(reducer, composeWithDevTools(applyMiddleware(...middlewares)))
} else {
    store = initialState => createStore(reducer, applyMiddleware(...middlewares))
}

const reducer = combineReducers({
    user,
    flowers,
    routing: routerReducer,
    i18nState,
    layout,
    message
})
 
export { history } 

export default store()
