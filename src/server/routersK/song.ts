import * as Router from 'koa-router'
import upload from '../uploadK'
import { MulterIncomingMessage } from 'koa-multer'
import * as controllerSong from '../controllers/song'

// import { createUser, updateUser } from '../controllers/auth'

export default new Router()
  .prefix('/song')
  .post('/upload', upload.single('image'), async (ctx: Router.RouterContext & { req: MulterIncomingMessage }) => {
    const filedata = ctx.req.file
    console.log(filedata)
    if (!filedata) {
      ctx.body = 'Ошибка при загрузке файла'
    } else {
      ctx.body = filedata.filename
    }
  })
