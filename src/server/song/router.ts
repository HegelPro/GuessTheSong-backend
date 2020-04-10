import {Router} from 'express'
import {getSongList, getSong, updateSong} from './controllers'
// import * as jwt from 'express-jwt'
// import {AUTH_SECRET} from '../../utils/secrets'

export default Router()
  .get('/list',  getSongList)
  .get('/:id', getSong)
  .post('/', updateSong)
