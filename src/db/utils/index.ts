import {Repository} from 'typeorm'

export const saveEntity = <T>(
  repository: Repository<T>,
  callback: (entity: T) => void,
  onError?: (e: Error) => void,
): ((entity: T) => Promise<void>) => (entity: T): Promise<void> =>
  repository
    .save(entity)
    .then(callback)
    .catch(onError)

export const findAllEntitys = <T>(
  repository: Repository<T>,
  callback: (entity: T[]) => void,
  onError?: (e: Error) => void,
): (() => Promise<void>) => (): Promise<void> =>
  repository
    .find()
    .then(callback)
    .catch(onError)

// Use findOneOrFail() becouse findOne() dont work correct with (T | undefinded)
export const findEntity = <T>(
  repository: Repository<T>,
  callback: (entity: T | undefined) => void,
  onError?: (e: Error) => void,
): ((id: string) => Promise<void>) => (id: string): Promise<void> =>
  repository
    .findOneOrFail(id)
    .then(callback)
    .catch(onError)
