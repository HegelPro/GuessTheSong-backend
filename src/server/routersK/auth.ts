import * as Router from 'koa-router'

import { createUser, updateUser } from '../controllers/auth'

export default new Router()
  .prefix('/auth')
  .post('/register', createUser)
  .put('/login/:id', updateUser)
