import 'reflect-metadata'
import {chain, fork } from 'fluture'
import { connectDbTask } from './db'
import { connectExpressTask } from './server'

fork
  <any>(console.error)
  <never>(() => console.log('DataBase and Sever works'))
  (connectDbTask
    .pipe(chain(() => connectExpressTask))
  )