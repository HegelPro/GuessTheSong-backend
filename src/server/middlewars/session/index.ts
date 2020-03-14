import { BaseContext } from 'koa'

export const sessionMiddleware = () => async (ctx: BaseContext, next): Promise<void> => {
  // ignore favicon
  if (ctx.path === '/favicon.ico') return
  console.log(ctx.body)
  await next()
}
