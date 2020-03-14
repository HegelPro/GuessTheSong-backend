export const bodyMiddleware = () => async (ctx: any, next): Promise<void> => {
  // TODO need type
  ctx.body = ctx.request.body
  await next()
}
