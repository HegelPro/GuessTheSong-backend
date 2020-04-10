import * as dotenv from 'dotenv'

dotenv.config({path: '.env'})
dotenv.config({path: '.env.secret'})

export const PORT = process.env.PORT as string
export const AUTH_SECRET = process.env.SESSION_SECRET as string
