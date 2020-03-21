import {Song} from './entity'
import {getRepository} from 'typeorm'
import {RequestHandler} from 'express'
import {saveEntity, findAllEntitys, findEntity} from '../../db/utils'
import {sendFP} from '../utils'

export const getSong: RequestHandler<{id?: string}> = (req, res) =>
  findEntity(getRepository(Song), sendFP(res), sendFP(res))(req.params.id)

export const getSongs: RequestHandler = (req, res) =>
  findAllEntitys(getRepository(Song), sendFP(res))()

export const addSong: RequestHandler = (req, res) =>
  Song.songParamsToEitherSong(req.body as unknown)
    .ifLeft(sendFP(res))
    .ifRight(saveEntity(getRepository(Song), sendFP(res)))
