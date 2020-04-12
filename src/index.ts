import 'reflect-metadata'
import {chain, fork } from 'fluture'
import { connectDbTask } from './db'
import { connectExpressTask } from './server'

export const startTask = connectDbTask
  .pipe(chain(() => connectExpressTask))

startTask
  .pipe(fork
    (console.error)
    (() => console.log('DataBase and Sever works'))
  )
  