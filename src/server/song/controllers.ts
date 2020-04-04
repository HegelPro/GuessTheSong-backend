import { Song } from './entity'
import { RequestHandler } from 'express'
import { sendFP } from '../utils'
import { getRepository } from 'typeorm'
import { sendDBResponse } from '../utils'
import { getEntity, getAllEntitys, updateEntity } from '../../db/utils'

export const getSong: RequestHandler<{ id: string }> = (req, res) => {
  const getSongTask = getEntity(getRepository(Song))(req.params.id)

  sendDBResponse<Song>
    (res)
    (getSongTask)
}

export const getSongList: RequestHandler = (req, res) => {
  const getSongListTask = getAllEntitys(getRepository(Song))()

  sendDBResponse<Song[]>
    (res)
    (getSongListTask)
}

export const updateSong: RequestHandler = (req, res) => {
  Song.songParamsToEitherSong(req.body as unknown)
    .ifLeft(sendFP(res))
    .ifRight((song) => {
      const updateEntityTask = updateEntity(getRepository(Song))(song)

      sendDBResponse<Song>
        (res)
        (updateEntityTask)
    })
}
