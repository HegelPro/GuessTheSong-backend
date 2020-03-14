import { BaseContext } from 'koa'

export const ignoreMiddleware = () => async (ctx: BaseContext, next): Promise<void> => {
  if (ctx.path === '/favicon.ico') return
  if (/\/socket.io/.test(ctx.path)) return
  await next()
}
