import { Song } from './entity'
import { RequestHandler } from 'express'
import { sendFP } from '../utils'
import { getRepository } from 'typeorm'
import { sendDBResponse } from '../utils'
import { getEntity, getAllEntitys, updateEntity } from '../../db/utils'

export const getSong: RequestHandler<{ id: string }> = (req, res) =>
  getEntity
    (getRepository(Song))
    (req.params.id)
    .pipe(sendDBResponse(res))

export const getSongList: RequestHandler = (_, res) =>
  getAllEntitys
    (getRepository(Song))
    ()
    .pipe(sendDBResponse(res))

export const updateSong: RequestHandler = (req, res) =>
  Song.songParamsToEitherSong(req.body as unknown)
    .ifLeft(sendFP(res))
    .ifRight(song =>
      updateEntity
        (getRepository(Song))
        (song)
        .pipe(sendDBResponse(res))
    )
