import { SessionActions, Session } from './types'
import { createReducer } from 'typesafe-actions'
import * as actions from './actions'

export default createReducer<Session, SessionActions>({
  isAuth: false,
}).handleAction(actions.setSessionAction, (s, a) => a.payload)
