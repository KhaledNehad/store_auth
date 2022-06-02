import dotenv from 'dotenv'

dotenv.config()

const {
  PORT,
  NODE_ENV,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_NAME_TEST,
  DB_USER,
  DB_PASSWORD,
  BCRYPT_PASSWORD,
  SALT_ROUNDS,
  JWT_SECRET,
} = process.env
export default {
  port: PORT,
  nodeEnv: NODE_ENV,
  dbHost: DB_HOST,
  dbPort: DB_PORT,
  database: NODE_ENV === 'dev' ? DB_NAME : DB_NAME_TEST,
  dbUser: DB_USER,
  dbPassword: DB_PASSWORD,
  paper: BCRYPT_PASSWORD,
  salt: SALT_ROUNDS,
  jwtSecret: JWT_SECRET,
}
