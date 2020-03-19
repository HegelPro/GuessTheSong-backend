import { Song } from '../../db/entity/Song'
import { getRepository } from 'typeorm'
import * as Router from 'koa-router'
import {IServer, ISong} from 'guess-the-song-contracts'
import { RequestHandler, Request, Response } from 'express'

export const getSong: RequestHandler<{id: string}> = (req, res) =>
  getRepository(Song).findOneOrFail(req.params.id)
    .then(song => res.send(song))


export const getSongs: RequestHandler = (req, res) =>
  getRepository(Song).find()
    .then(songs => res.send(songs))


// export async function addSongK(ctx: Router.RouterContext): Promise<void> {
//   const song = Song.songParamsToEitherSong(ctx.body)

//   if (song.isRight()) {
//     await getRepository(Song).save(song.extract())

//     ctx.status = 200
//     ctx.body = song
//   } else {
//     ctx.status = 400
//     ctx.body = new Error('validate error')
//   }
// }

export const addSong: RequestHandler = (req, res) =>
  Song.songParamsToEitherSong(req.body as unknown)
    .ifLeft(() => res.send())
    .ifRight(song =>
      getRepository(Song).save(song)
        .then(song => res.send(song)))
    
  