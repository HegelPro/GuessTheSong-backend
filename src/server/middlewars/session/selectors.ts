import { Session } from './types'

import { ISelector } from '../../../store/types'

export const selectorSession: ISelector<Session> = state => state.session
