import * as dotenv from 'dotenv'

dotenv.config({path: '.env'})
dotenv.config({path: '.env.secret'})

export const PORT = process.env.PORT
export const SESSION_SECRET = process.env.SESSION_SECRET
