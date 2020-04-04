import {Router} from 'express'
import {getSongList, getSong, updateSong} from './controllers'

export default Router()
  .get('/list', getSongList)
  .get('/:id', getSong)
  .post('/', updateSong)
