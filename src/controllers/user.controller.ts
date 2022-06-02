import { Request, Response, NextFunction } from 'express'
import UserModel from '../models/user.model'
import jwt from 'jsonwebtoken'
import config from '../config'

const userModel = new UserModel()

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.createUser(req.body)
    res.json({
      status: 'success',
      data: { ...user },
      message: 'User created successfully',
    })
  } catch (error) {
    next(error)
  }
}

export const getMany = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userModel.getUsers()
    res.json({
      status: 'success',
      data: users,
      message: 'Users retrieved successfully',
    })
  } catch (error) {
    next(error)
  }
}

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.getUser(req.params.id as string)
    res.json({
      status: 'success',
      data: user,
      message: 'User retrieved successfully',
    })
  } catch (error) {
    next(error)
  }
}

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.updateUser(req.body)
    res.json({
      status: 'success',
      data: user,
      message: 'User updated successfully',
    })
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.deleteUser(req.params.id as string)
    res.json({
      status: 'success',
      data: user,
      message: 'User deleted successfully',
    })
  } catch (error) {
    next(error)
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body
    const user = await userModel.authenticateUser(email, password)
    const token = jwt.sign({ user }, config.jwtSecret as unknown as string)
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password',
      })
    }
    return res.json({
      status: 'success',
      data: { ...user, token },
      message: 'User authenticated successfully',
    })
  } catch (error) {
    return next(error)
  }
}
