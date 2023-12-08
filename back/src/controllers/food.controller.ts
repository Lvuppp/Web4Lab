import { NextFunction, Request, Response } from 'express'
import { CreateFoodDto } from '../dtos/CreateFood.dto'
import { foodService } from '../services/food.service'

export class FoodController {
  async createFood(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto: CreateFoodDto = req.body
      const newFood = await foodService.createFood(dto)
      res.status(201).json(newFood)
    } catch (error) {
      next(error)
    }
  }

  async getAllFood(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const allFood = await foodService.getAllFood()
      res.json(allFood)
    } catch (error) {
      next(error)
    }
  }
}
export const foodController = new FoodController()
