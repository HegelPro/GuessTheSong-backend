import { Song } from './entity'
import { getRepository } from 'typeorm'
import { RequestHandler } from 'express'

export const getSong: RequestHandler<{ id: string }> = (req, res) =>
  getRepository(Song)
    .findOneOrFail(req.params.id)
    .then(song => res.send(song))

export const getSongs: RequestHandler = (req, res) =>
  getRepository(Song)
    .find()
    .then(songs => res.send(songs))

export const addSong: RequestHandler = (req, res) =>
  Song.songParamsToEitherSong(req.body as unknown)
    .ifLeft(() => res.send())
    .ifRight(song =>
      getRepository(Song)
        .save(song)
        .then(song => res.send(song)),
    )
