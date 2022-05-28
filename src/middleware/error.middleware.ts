import { Response, Request } from 'express'
import Error from '../interfaces/error.interface'

const errorMiddleware = (err: Error, req: Request, res: Response) => {
  const status = err.statusCode || 500
  const message = err.message || 'Something went wrong'
  res.status(status).json({
    message,
    status,
  })
}

export default errorMiddleware
