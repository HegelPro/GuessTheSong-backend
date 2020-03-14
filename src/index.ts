import 'reflect-metadata'
import { createConnection } from 'typeorm'

import * as Koa from 'koa'
import * as logger from 'koa-logger'
import * as koaBody from 'koa-body'
import * as cors from '@koa/cors'
import * as serve from 'koa-static'
import * as path from 'path'

import { ignoreMiddleware } from './server/middlewars/ignore'
import { sessionMiddleware } from './server/middlewars/session'
import { bodyMiddleware } from './server/middlewars/body'

import authRouter from './server/routers/auth'
import songRouter from './server/routers/song'

import { PORT } from './util/secrets'

const app = new Koa()

async function start(): Promise<void> {
  await createConnection().catch(error => console.log(error))
  console.log('db connected!')

  await new Promise(res =>
    app
      .use(ignoreMiddleware())
      .use(cors())
      .use(serve(path.join(__dirname, 'public')))
      .use(logger())
      .use(koaBody())
      .use(bodyMiddleware())
      .use(sessionMiddleware())
      .use(authRouter.routes())
      .use(songRouter.routes())
      .listen(PORT, res),
  )
  console.log('server connected!')
}

start()
