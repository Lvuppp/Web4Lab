import express from 'express'
import { validationMiddleware } from '../middlewares/validation.middleware'
import { CreateAnimalDto } from '../dtos/CreateAnimal.dto'
import { animalController } from '../controllers/animal.controller'
import { authenticateCookieMiddleware } from '../middlewares/auth.middleware'

const router = express.Router()

router.get('/', animalController.getAllAnimals)
router.get('/:id', authenticateCookieMiddleware, animalController.getAnimalInfo)
router.post('/', authenticateCookieMiddleware, validationMiddleware(CreateAnimalDto), animalController.createAnimal)

export default router
