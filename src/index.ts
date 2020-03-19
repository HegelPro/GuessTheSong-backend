import 'reflect-metadata'
import { createConnection } from 'typeorm'

import * as Koa from 'koa'
import * as logger from 'koa-logger'
import * as koaBody from 'koa-body'
import * as cors from '@koa/cors'
import * as serve from 'koa-static'
import * as path from 'path'

import * as express from 'express'

import { ignoreMiddleware } from './server/middlewars/ignore'
import { sessionMiddleware } from './server/middlewars/session'
import { bodyMiddleware } from './server/middlewars/body'

import authRouterK from './server/routersK/auth'
import songRouterK from './server/routersK/song'

import songRouter from './server/routers/song'

import { PORT } from './util/secrets'

const appK = new Koa()
const app = express()

async function start(): Promise<void> {
  await createConnection().catch(error => console.log(error))
  console.log('db connected!')

  await new Promise(res =>
    appK
      .use(ignoreMiddleware())
      .use(cors())
      .use(serve(path.join(__dirname, 'public')))
      .use(logger())
      .use(koaBody())
      .use(bodyMiddleware())
      .use(sessionMiddleware())
      .use(authRouterK.routes())
      .use(songRouterK.routes())
      .listen(PORT, res),
  )
  console.log('server connected!')
  
  app
    .use(express.json())
    .use('/song', songRouter)
    .listen(5001, () => console.log('express server connected!'))
}

start()
