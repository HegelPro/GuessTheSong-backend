import * as dotenv from 'dotenv'

dotenv.config({ path: '.env' })

export const PORT = process.env.PORT
