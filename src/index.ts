import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import errorMiddleware from './middleware/error.middleware'
import config from './config'
import db from './database'

const PORT = config.port || 3000
const app: Application = express()

// ! Middleware \\
// Middleware to parse the body of the request
app.use(express.json())
// HTTP request logger middleware
app.use(morgan('tiny'))
// HTTP security headers middleware
app.use(helmet())
// Rate limiter middleware
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests from this IP, please try again in 10 minutes.',
})
app.use(limiter)
// ! End Middleware \\

// add routes
app.get('/', (req: Request, res: Response) => {
  throw new Error()
  res.json({
    message: 'Hello World 👋 🌍',
  })
})

// Post request
app.post('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World 👋 🌍 from POST',
    data: req.body,
  })
})

app.use(errorMiddleware)

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: 'Ohh no! You are lost! 😅',
  })
})

db.connect().then((client) => {
  return client
    .query('SELECT NOW()')
    .then((result) => {
      client.release()
      console.log(result.rows)
      console.log('Connected to the database')
    })
    .catch((err) => {
      client.release()
      console.log(err.stack)
    })
})

// start express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

export default app
