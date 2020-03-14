import { Song } from '../../db/entity/Song'
import { getRepository } from 'typeorm'
import * as Router from 'koa-router'
import { Maybe } from 'purify-ts'

export async function getSong(ctx: Router.RouterContext): Promise<void> {
  if (ctx.params.id) {
    try {
      const song = await getRepository(Song).findOneOrFail(ctx.params.id)
      ctx.status = 200
      ctx.body = song
    } catch (e) {
      ctx.status = 400
      ctx.body = new Error('song not finded')
    }
  } else {
    ctx.status = 400
    ctx.body = new Error('song not finded')
  }
}

export async function getSongs(ctx: Router.RouterContext): Promise<void> {
  const songs = await getRepository(Song).find()

  ctx.status = 200
  ctx.body = songs
}

export async function addSong(ctx: Router.RouterContext): Promise<void> {
  const song = Song.songParamsToEitherSong(ctx.body)

  if (song.isRight()) {
    await getRepository(Song).save(song.extract())

    ctx.status = 200
    ctx.body = song
  } else {
    ctx.status = 400
    ctx.body = new Error('validate error')
  }
}