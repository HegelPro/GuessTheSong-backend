import 'reflect-metadata'
import {createConnection} from 'typeorm'

import * as express from 'express'
import * as cors from 'cors'
import * as path from 'path'

import {ignoreMiddleware} from './server/middlewars/ignore'
import songRouter from './server/song/router'

import {PORT} from './util/secrets'

const app = express()

async function start(): Promise<void> {
  await createConnection().catch(error => console.log(error))
  console.log('db connected!')

  app
    .use(cors())
    .use(ignoreMiddleware())
    .use(express.static(path.join(__dirname, 'public')))
    .use(express.json())
    .use('/song', songRouter)
    .listen(PORT, () => console.log('express server connected!'))
}

start()
