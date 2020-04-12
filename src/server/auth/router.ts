import {Router} from 'express'
import * as jsonwebtoken from 'jsonwebtoken'
import { AUTH_SECRET } from '../../utils/secrets'

export default Router()
  .get('/access' , (req, res) => {
    const token = jsonwebtoken.sign({name: 'fff'}, AUTH_SECRET)
    res.status(200).send({token: `Bearer ${token}`})
  })
  .get('/refresh', (req, res) => {
    const token = jsonwebtoken.sign({name: 'fff'}, AUTH_SECRET)
    res.status(200).send({token: `Bearer ${token}`})
  })