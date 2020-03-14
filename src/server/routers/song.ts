import * as Router from 'koa-router'
import upload from '../upload'
import { MulterIncomingMessage } from 'koa-multer'
import { Song } from '../../db/entity/Song'
import { getRepository } from 'typeorm'

// import { createUser, updateUser } from '../controllers/auth'

export default new Router()
  .prefix('/song')
  .get('/list', async (ctx: Router.RouterContext) => {
    const songs = await getRepository(Song).find()

    ctx.status = 200
    ctx.body = songs
  })
  .post('/add', async (ctx: Router.RouterContext) => {
    const song = Song.songParamsToEitherSong(ctx.body)

    if (song.isRight()) {
      await getRepository(Song).save(song.extract())

      ctx.status = 200
      ctx.body = song
    } else {
      ctx.status = 400
      ctx.body = new Error('validate error')
    }
  })
  .post('/edit/:id', async () => {})
  .post('/upload/:id', upload.single('image'), async (ctx: Router.RouterContext & { req: MulterIncomingMessage }) => {
    const filedata = ctx.req.file
    console.log(filedata)
    // console.log(req.body)
    // console.log(req.params.id)
    if (!filedata) {
      ctx.body = 'Ошибка при загрузке файла'
    } else {
      ctx.body = 'Файл загружен'
    }
    //   await Song.findByIdAndUpdate(req.params.id, {
    //     url: `/${filedata.filename}`,
    //   })
    // res.send('Файл загружен')
  })
// .post('/register', createUser)
// .put('/login/:id', updateUser)
