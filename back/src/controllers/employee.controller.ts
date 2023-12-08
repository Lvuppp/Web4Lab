import { NextFunction, Request, Response } from 'express'
import { employeeService } from '../services/employee.service'
import { CustomError } from '../middlewares/error.middleware'
import { CreateEmployeeDto } from '../dtos/CreateEmployee.dto'
import { UpdateEmployeeDto } from '../dtos/UpdateEmployee.dto'
import { RequestExtended } from '../middlewares/auth.middleware'

export class EmployeeController {
  async getAllEmployees(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const employees = await employeeService.getAllEmployees()
      res.json(employees)
    } catch (error) {
      next(error)
    }
  }

  async getEmployeeById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const employeeId = req.params.id
      const employee = await employeeService.getEmployeeById(employeeId)
      if (!employee) {
        throw new CustomError('Employee not found', 404)
      }
      res.json(employee)
    } catch (error) {
      next(error)
    }
  }

  async updateEmployee(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const employeeId = req.params.id
      const updatedEmployeeData: UpdateEmployeeDto = req.body
      const updatedEmployee = await employeeService.updateEmployee(employeeId, updatedEmployeeData)
      res.json(updatedEmployee)
    } catch (error) {
      next(error)
    }
  }

  async deleteEmployee(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const employeeId = req.params.id
      await employeeService.deleteEmployee(employeeId)
      res.status(204).send()
    } catch (error) {
      next(error)
    }
  }

  async registerEmployee(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto: CreateEmployeeDto = req.body
      const existingEmployee = await employeeService.getEmployeeByUsername(dto.username)

      if (existingEmployee) {
        throw new CustomError('Username is already taken', 400)
      }

      const newEmployee = await employeeService.createEmployee(dto)

      res.cookie('employeeId', newEmployee.id, { httpOnly: true })

      res.status(201).json(newEmployee)
    } catch (error) {
      next(error)
    }
  }

  async loginEmployee(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { username, password } = req.body
      const { success, id } = await employeeService.authenticateEmployee(username, password)
      if (success) {
        res.cookie('employeeId', id, { httpOnly: true, maxAge: 604800000, sameSite: 'lax' })
      }

      res.json({ message: 'Login successful' })
    } catch (error) {
      next(error)
    }
  }
  logoutEmployee(req: Request, res: Response): void {
    res.clearCookie('employeeId')
    delete req.user
    res.status(200).json({ message: 'Logout successful' })
  }
  async getMe(req: RequestExtended, res: Response, next: NextFunction) {
    try {
      const userId = req.id
      const me = await employeeService.getEmployeeById(userId as string)
      if (!me) {
        throw new CustomError('Unauthorized', 401)
      }
      res.json({ success: true, employee: me })
    } catch (e) {
      next(e)
    }
  }
}

export const employeeController = new EmployeeController()
