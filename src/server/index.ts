import { node } from 'fluture'

import app from './app'

import { PORT } from '../utils/secrets'

export const connectExpressTask = node<any, never>((done) => {
  try {
    app.listen(PORT, () => done(null))
  } catch (e) {
    done(e)
  }
})
