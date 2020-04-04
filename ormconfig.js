const result = require('dotenv').config({
  path: require('path').resolve(process.cwd(), '.env.secret'),
})

if (result.error) {
  throw result.error
}

const {HOST, PORT, USERNAME, PASSWORD, DATABASE} = result.parsed

module.exports = {
  type: 'mysql',
  host: HOST,
  port: PORT,
  username: USERNAME,
  password: PASSWORD,
  database: DATABASE,
  synchronize: true,
  logging: false,
  entities: ['src/db/entity/**/*.ts'],
  migrations: ['src/db/migration/**/*.ts'],
  subscribers: ['src/db/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/db/entity',
    migrationsDir: 'src/db/migration',
    subscribersDir: 'src/db/subscriber',
  },
  insecureAuth: true,
}
