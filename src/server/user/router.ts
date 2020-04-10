import { Router } from 'express'
import { getUserList, updateUser } from './controllers'

export default Router()
  .get('/list', getUserList)
  .post('/', updateUser)
