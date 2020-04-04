import { attemptP, FutureInstance } from 'fluture'
import { QueryFailedError, Repository, ObjectLiteral } from 'typeorm'

export const getEntity = <E extends ObjectLiteral>(rep: Repository<E>) =>
  (id: string): FutureInstance<QueryFailedError, E> =>
    attemptP<QueryFailedError, E>(
      () => rep.findOneOrFail(id)
    )

export const getAllEntitys = <E extends ObjectLiteral>(rep: Repository<E>) =>
  (): FutureInstance<QueryFailedError, E[]> =>
    attemptP<QueryFailedError, E[]>(
      () => rep.find()
    )

export const updateEntity = <E extends ObjectLiteral>(rep: Repository<E>) =>
  (entity: E): FutureInstance<QueryFailedError, E> =>
    attemptP<QueryFailedError, E>(
      () => rep.save(entity)
    )