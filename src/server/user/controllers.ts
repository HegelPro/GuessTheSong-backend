import { getRepository } from 'typeorm'
import { User } from '../../db/entity'
import { updateEntity, getAllEntitys } from '../../db/utils'
import { sendDBResponse } from '../utils'
import { RequestHandler } from 'express'

export const getUserList: RequestHandler = (req, res) =>
  getAllEntitys(getRepository(User))()
    .pipe(sendDBResponse<User[]>(res))

export const updateUser: RequestHandler = (req, res) =>
  updateEntity(getRepository(User))(User.of(req.body))
    .pipe(sendDBResponse<User>(res))
