import { ISelector, IStore } from '../types'

export const select = <T>(store: IStore, selector: ISelector<T>): T => {
  const state = store.getState()
  return selector(state)
}
