import { store, reducers } from '.'
import { StateType } from 'typesafe-actions'

export type IStore = typeof store

export type IState = StateType<typeof reducers>

export type ISelector<T> = (state: IState) => T
