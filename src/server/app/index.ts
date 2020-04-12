import * as express from 'express'
import * as cors from 'cors'
import * as path from 'path'
import * as jwt from 'express-jwt'

import { ignoreMiddleware } from '../middlewars/ignore'

import songRouter from '../song/router'
import authRouter from '../auth/router'
import userRouter from '../user/router'

import { AUTH_SECRET } from '../../utils/secrets'

const app = express()
  .use(cors())
  .use(ignoreMiddleware())
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json())

export default app
  .use('/auth', authRouter)
  .use(jwt({secret: AUTH_SECRET}))
  .use('/song', songRouter)
  .use('/user', userRouter)
