import { Pool } from 'pg'
import config from '../config'

const pool = new Pool({
  user: config.dbUser,
  host: config.dbHost,
  database: config.database,
  password: config.dbPassword,
  port: parseInt(config.dbPort as string, 10),
})

pool.on('error', (err: Error) => {
  console.log(err.message)
})

export default pool
