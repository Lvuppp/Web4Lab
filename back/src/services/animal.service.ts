import { dataSource } from '../dataSource'
import { AnimalEntity } from '../entities/animal.entity'
import { CreateAnimalDto } from '../dtos/CreateAnimal.dto'
import { EmployeeEntity } from '../entities/employee.entity'
import { CustomError } from '../middlewares/error.middleware'

export class AnimalService {
  private animalRepository = dataSource.getRepository(AnimalEntity)
  private employeeRepository = dataSource.getRepository(EmployeeEntity)

  async getAllAnimals(options?: { sort?: string; search?: string }): Promise<AnimalEntity[]> {
    let queryBuilder = this.animalRepository.createQueryBuilder('animal')

    if (options?.sort) {
      queryBuilder = queryBuilder.orderBy(`animal.birthDate`, options.sort as 'ASC' | 'DESC')
    }

    if (options?.search) {
      queryBuilder = queryBuilder.andWhere(`animal.name ILIKE :search OR animal.species ILIKE :search`, {
        search: `%${options.search}%`,
      })
    }

    return queryBuilder.getMany()
  }

  async createAnimal(createAnimalDto: CreateAnimalDto): Promise<AnimalEntity> {
    const careTaker = await this.employeeRepository.findOneBy({ id: createAnimalDto.careTakerId })

    if (!careTaker) {
      throw new CustomError('CareTaker not found', 404)
    }

    const newAnimal = this.animalRepository.create({
      ...createAnimalDto,
      careTaker: careTaker,
    })

    return this.animalRepository.save(newAnimal)
  }

  async getAnimalInfo(id: string) {
    return this.animalRepository.findOne({ where: { id: id }, relations: ['orders.foodType', 'careTaker'] })
  }
}
export const animalService = new AnimalService()
