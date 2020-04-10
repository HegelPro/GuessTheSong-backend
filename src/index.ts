import 'reflect-metadata'
import {chain, fork } from 'fluture'
import { connectDbTask } from './db'
import { connectExpressTask } from './server'

connectDbTask
  .pipe(chain(() => connectExpressTask))
  .pipe(fork
    (console.error)
    (() => console.log('DataBase and Sever works'))
  )
  