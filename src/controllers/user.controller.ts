import { Request, Response, NextFunction } from 'express'
import UserModel from '../models/user.model'

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
