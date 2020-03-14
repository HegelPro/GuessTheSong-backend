import { User } from '../../db/entity/User'
import { getRepository } from 'typeorm'
import { RouterContext } from 'koa-router'

export const createUser = async (ctx: RouterContext): Promise<void> => {
  const user = User.userParamsToEitherUser(ctx.body)

  if (user.isRight()) {
    await getRepository(User).save(user.extract())

    ctx.status = 200
    ctx.body = user
  } else {
    ctx.status = 400
    ctx.body = new Error('validate error')
  }
}

export const updateUser = async (ctx: RouterContext): Promise<void> => {
  const user = User.userParamsToEitherUser(ctx.body)

  if (user.isRight()) {
    const { id } = ctx.params

    if (id) {
      const foundedUser = await getRepository(User).findOneOrFail({ id })
      await getRepository(User).save(User.merdgeUsers(foundedUser, user.extract()))

      ctx.status = 200
      ctx.body = foundedUser
    } else {
      ctx.status = 400
      ctx.body = new Error('dont take id')
    }
  } else {
    ctx.status = 400
    ctx.body = new Error('validate error')
  }
}
