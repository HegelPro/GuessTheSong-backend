import * as Router from 'koa-router'
import upload from '../upload'
import { MulterIncomingMessage } from 'koa-multer'
import * as controllerSong from '../controllers/song'

// import { createUser, updateUser } from '../controllers/auth'

export default new Router()
  .prefix('/song')
  .get('/list', controllerSong.getSongs)
  .get('/:id', controllerSong.getSong)
  // .post('/edit/:id', async () => {})
  .post('/upload', upload.single('image'), async (ctx: Router.RouterContext & { req: MulterIncomingMessage }) => {
    const filedata = ctx.req.file
    console.log(filedata)
    // console.log(req.body)
    // console.log(req.params.id)
    if (!filedata) {
      ctx.body = 'Ошибка при загрузке файла'
    } else {
      ctx.body = filedata.filename
    }
    //   await Song.findByIdAndUpdate(req.params.id, {
    //     url: `/${filedata.filename}`,
    //   })
    // res.send('Файл загружен')
  })
