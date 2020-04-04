import { QueryFailedError } from 'typeorm'
import { Response } from 'express'

type DbErrorHandler = (res: Response) => (error: QueryFailedError) => void

export const dbErrorHandler: DbErrorHandler = res => (error): void => {
  res.send(error)
}
