import { RequestHandler } from 'express'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const ignoreMiddleware: () => RequestHandler = () => (req, _, next) => {
  if (req.path === '/favicon.ico') return
  if (/\/socket.io/.test(req.path)) return
  next()
}
