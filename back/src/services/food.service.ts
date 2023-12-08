import { dataSource } from '../dataSource'
import { FoodEntity } from '../entities/food.entity'
import { CreateFoodDto } from '../dtos/CreateFood.dto'
import { CustomError } from '../middlewares/error.middleware'

export class FoodService {
  private foodRepository = dataSource.getRepository(FoodEntity)

  async createFood(createFoodDto: CreateFoodDto): Promise<FoodEntity> {
    try {
      const newFood = this.foodRepository.create(createFoodDto)
      return this.foodRepository.save(newFood)
    } catch (error) {
      throw new CustomError(`Error while creating food: ${(error as Error).message}`, 500)
    }
  }
  async getAllFood(): Promise<FoodEntity[]> {
    try {
      return this.foodRepository.find()
    } catch (error) {
      throw new CustomError(`Error while fetching food: ${(error as Error).message}`, 500)
    }
  }
}
export const foodService = new FoodService()
