import { employeeService } from '../services/employee.service'
import { CustomError } from './error.middleware'
import { NextFunction, Request, Response } from 'express'

export interface RequestExtended extends Request {
  id?: string
}
export const authenticateCookieMiddleware = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const employeeId = req.cookies.employeeId

    if (!employeeId) {
      throw new CustomError('Unauthorized', 401)
    }

    const employee = await employeeService.getEmployeeById(employeeId)

    if (!employee) {
      throw new CustomError('Unauthorized', 401)
    }

    req.id = employee.id
    next()
  } catch (error) {
    next(error)
  }
}
