import { createConnection, Connection } from 'typeorm'

import { attemptP } from 'fluture'

export const connectDbTask = attemptP<any, Connection>(() => createConnection())
