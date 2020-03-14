import { createAction } from 'typesafe-actions'
import { Session } from './types'

export const setSessionAction = createAction('session/set')<Session>()
