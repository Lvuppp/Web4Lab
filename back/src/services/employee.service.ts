import { dataSource } from '../dataSource'
import { EmployeeEntity, EmployeePositions } from '../entities/employee.entity'
import { CustomError } from '../middlewares/error.middleware'
import { Repository } from 'typeorm'
import { CreateEmployeeDto } from '../dtos/CreateEmployee.dto'
import bcrypt from 'bcrypt'
import { FacilityEntity } from '../entities/facility.entity'
import { UpdateEmployeeDto } from '../dtos/UpdateEmployee.dto'
interface UpdateEmployee {
  firstName?: string
  secondName?: string
  position?: EmployeePositions
  age?: number
  phoneNumber?: string
  facilities?: FacilityEntity[]
}
export class EmployeeService {
  private employeeRepository: Repository<EmployeeEntity> = dataSource.getRepository(EmployeeEntity)
  private facilityRepository: Repository<FacilityEntity> = dataSource.getRepository(FacilityEntity)

  constructor() {
    this.employeeRepository = dataSource.getRepository(EmployeeEntity)
  }

  async getAllEmployees(): Promise<EmployeeEntity[]> {
    try {
      return this.employeeRepository.find()
    } catch (error) {
      throw new CustomError(`Error while fetching employees: ${(error as Error).message}`, 500)
    }
  }

  async getEmployeeById(id: string) {
    try {
      return this.employeeRepository.findOne({ where: { id: id }, relations: { facilities: true } })
    } catch (error) {
      throw new CustomError(`Error while fetching employee: ${(error as Error).message}`, 500)
    }
  }
  async getEmployeeByUsername(username: string) {
    try {
      return this.employeeRepository.findOneBy({ username: username })
    } catch (error) {
      throw new CustomError(`Error while fetching employee: ${(error as Error).message}`, 500)
    }
  }
  async authenticateEmployee(username: string, password: string) {
    const employee = await this.employeeRepository.findOne({
      where: { username: username },
      select: ['id', 'password'],
    })
    if (!employee) {
      throw new CustomError('Invalid credentials', 401)
    }
    if (await bcrypt.compare(password, employee.password)) {
      return { success: true, id: employee.id }
    } else {
      throw new CustomError('Invalid credentials', 401)
    }
  }
  async createEmployee(employeeData: CreateEmployeeDto): Promise<EmployeeEntity> {
    try {
      const newEmployee = this.employeeRepository.create(employeeData)
      if (newEmployee.password) {
        const salt = await bcrypt.genSalt(10)
        newEmployee.password = await bcrypt.hash(newEmployee.password, salt)
      }

      return this.employeeRepository.save(newEmployee)
    } catch (error) {
      throw new CustomError(`Error while creating employee: ${(error as Error).message}`, 500)
    }
  }

  async updateEmployee(id: string, employeeData: UpdateEmployeeDto): Promise<EmployeeEntity | null> {
    try {
      const { facilities, ...restEmployeeData } = employeeData
      let updateEmployee: UpdateEmployee
      updateEmployee = { ...restEmployeeData }
      if (facilities && facilities.length > 0) {
        const facilityEntities = await Promise.all(
          facilities.map(async (facilityId: string) => {
            const facility = await this.facilityRepository.findOneBy({ id: facilityId })
            return facility
          }),
        )

        updateEmployee.facilities = facilityEntities.filter((facility) => facility !== undefined) as FacilityEntity[]
      }

      await this.employeeRepository.update(id, updateEmployee)

      return this.employeeRepository.findOneBy({ id: id })
    } catch (error) {
      throw new CustomError(`Error while updating employee: ${(error as Error).message}`, 500)
    }
  }

  async deleteEmployee(id: string): Promise<void> {
    try {
      const result = await this.employeeRepository.delete(id)
      if (result.affected === 0) {
        throw new CustomError('Employee not found', 404)
      }
    } catch (error) {
      throw new CustomError(`Error while deleting employee: ${(error as Error).message}`, 500)
    }
  }
}

export const employeeService = new EmployeeService()
