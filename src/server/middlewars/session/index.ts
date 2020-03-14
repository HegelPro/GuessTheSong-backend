import { BaseContext } from 'koa'

export const sessionMiddleware = () => async (ctx: BaseContext, next): Promise<void> => {
  await next()
}
