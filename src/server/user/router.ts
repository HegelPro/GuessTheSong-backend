import { Router } from 'express'
import { fork, attemptP, FutureInstance } from 'fluture'
import { compose, prop } from 'ramda'
import { Song } from '../song/entity'
import { getRepository, QueryFailedError } from 'typeorm'
import { dbErrorHandler } from '../error'

const getSing = (id: string): FutureInstance<QueryFailedError, Song> =>
  attemptP<QueryFailedError, Song>(
    () => getRepository(Song).findOneOrFail(id),
  )

export default Router().get<{id: string}>(':id', (req, res) => {
  fork
    <QueryFailedError>(dbErrorHandler(res))
    <Song>(compose(res.send.bind(res), prop('name')))
    (getSing(req.params.id))
})
