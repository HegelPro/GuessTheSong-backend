import * as multer from 'koa-multer'

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'src/public/')
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now().toString()}-${file.originalname}`)
  },
})

export default multer({ storage })
