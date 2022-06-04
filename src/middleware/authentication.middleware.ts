import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'
import Error from '../interfaces/error.interface'

const handleUnauthorizedError = (next: NextFunction) => {
  const error: Error = new Error('Login Error, please try again')
  error.statusCode = 401
  next(error)
}

const validateTokenMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.get('Authorization')
    if (authHeader) {
      const bearer = authHeader.split(' ')[0].toLocaleLowerCase()
      const token = authHeader.split(' ')[1]
      if (bearer === 'bearer' && token) {
        const decoded = jwt.verify(token, config.jwtSecret as unknown as string)
        if (decoded) {
          next()
        } else {
          handleUnauthorizedError(next)
        }
      } else {
        handleUnauthorizedError(next)
      }
    } else {
      handleUnauthorizedError(next)
    }
  } catch (error) {
    handleUnauthorizedError(next)
  }
}

export default validateTokenMiddleware
