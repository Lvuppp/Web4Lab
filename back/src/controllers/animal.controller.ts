import { animalService, AnimalService } from '../services/animal.service'
import { NextFunction, Request, Response } from 'express'
import { CreateAnimalDto } from '../dtos/CreateAnimal.dto'
import { CustomError } from '../middlewares/error.middleware'

export class AnimalController {
  async getAllAnimals(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const filterOptions = {
        sort: req.query.sort as string,
        search: req.query.search as string,
      }

      const animals = await animalService.getAllAnimals(filterOptions)
      res.json(animals)
    } catch (error) {
      next(error)
    }
  }
  async getAnimalInfo(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params

    const animalInfo = await animalService.getAnimalInfo(id)
    if (!animalInfo) {
      throw new CustomError('Animal not found', 404)
    }
    res.json(animalInfo)
  }
  async createAnimal(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto: CreateAnimalDto = req.body
      const newAnimal = await animalService.createAnimal(dto)
      res.status(201).json(newAnimal)
    } catch (error) {
      next(error)
    }
  }
}

export const animalController = new AnimalController()
