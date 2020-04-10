import { node } from 'fluture'

import * as express from 'express'
import * as cors from 'cors'
import * as path from 'path'

import { ignoreMiddleware } from './middlewars/ignore'

import songRouter from './song/router'
import authRouter from './auth/router'
import userRouter from './user/router'

import { PORT } from '../utils/secrets'

export const connectExpressTask = node<any, never>((done) => {
  try {
    const app = express()

    app
      .use(cors())
      .use(ignoreMiddleware())
      .use(express.static(path.join(__dirname, 'public')))
      .use(express.json())
    
    app
      .use('/song', songRouter)
      .use('/user', userRouter)
      .use('/auth', authRouter)

    app.listen(PORT, () => done(null))
  } catch (e) {
    done(e)
  }
})
