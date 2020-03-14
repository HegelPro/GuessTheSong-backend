import * as actions from './actions'
import { ActionType } from 'typesafe-actions'

export interface Session {
  isAuth: boolean
}

export type SessionActions = ActionType<typeof actions>
