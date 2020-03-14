import { createStore, combineReducers, applyMiddleware } from 'redux'

import sessionReducer from '../server/middlewars/session/reducer'

import logger from 'redux-logger'

export const reducers = combineReducers({
  session: sessionReducer,
})

export const store = createStore(reducers, {}, applyMiddleware(logger))
