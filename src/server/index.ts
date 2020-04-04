import * as express from 'express'
import * as session from 'express-session'
import * as cors from 'cors'
import * as path from 'path'
import * as passport from 'passport'

import { ignoreMiddleware } from './middlewars/ignore'
import songRouter from './song/router'
import authRouter from './user/router'

import { PORT, SESSION_SECRET } from '../utils/secrets'
import { node } from 'fluture'

export const connectExpressTask = node<any, never>((done) => {
  try {
    express()
      .use(cors())
      .use(ignoreMiddleware())
      .use(express.static(path.join(__dirname, 'public')))
      .use(express.json())
      .use(
        session({
          secret: SESSION_SECRET as string,
        }),
      )
      .use(passport.initialize())
      .use(passport.session())
      .use('/song', songRouter)
      .use('/auth', authRouter)
      .listen(PORT, () => done(null))
  } catch (e) {
    done(e)
  }
})
