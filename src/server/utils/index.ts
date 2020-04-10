import { Response, Send } from 'express'
import { fork, FutureInstance, Cancel } from 'fluture'
import { QueryFailedError } from 'typeorm'
import { dbErrorHandler } from '../error'

export const sendDBResponse = <E>(res: Response): ((source: FutureInstance<QueryFailedError, E>) => Cancel) =>
  fork
    <QueryFailedError>(dbErrorHandler(res))
    <E>(res.send.bind(res))

export const sendFP = (res: Response): Send => res.send.bind(res)
