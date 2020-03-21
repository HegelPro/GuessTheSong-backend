import {Response, Send} from 'express'

export const sendFP = (res: Response): Send => res.send.bind(res)
