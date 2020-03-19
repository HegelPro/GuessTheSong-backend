import { Router } from 'express'
import { getSongs, getSong, addSong } from './controllers'

export default Router()
  .get('/list', getSongs)
  .post('/', addSong)
  .get('/:id', getSong)
