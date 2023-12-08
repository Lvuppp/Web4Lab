import { Router } from 'express'
import { employeeController } from '../controllers/employee.controller'
import { UpdateEmployeeDto } from '../dtos/UpdateEmployee.dto'
import { CreateEmployeeDto } from '../dtos/CreateEmployee.dto'
import { validationMiddleware } from '../middlewares/validation.middleware'
import { authenticateCookieMiddleware } from '../middlewares/auth.middleware'

const router = Router()

router.get('/', authenticateCookieMiddleware, employeeController.getAllEmployees)
router.get('/me', authenticateCookieMiddleware, employeeController.getMe)
router.get('/:id', authenticateCookieMiddleware, employeeController.getEmployeeById)
router.post('/register', validationMiddleware(CreateEmployeeDto), employeeController.registerEmployee)
router.post('/login', employeeController.loginEmployee)
router.post('/logout', employeeController.logoutEmployee)
router.put('/:id', validationMiddleware(UpdateEmployeeDto), employeeController.updateEmployee)
router.delete('/:id', authenticateCookieMiddleware, employeeController.deleteEmployee)
export default router
