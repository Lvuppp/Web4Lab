import express from 'express'
import { validationMiddleware } from '../middlewares/validation.middleware'
import { CreateFoodDto } from '../dtos/CreateFood.dto'
import { foodController } from '../controllers/food.controller'
import { authenticateCookieMiddleware } from '../middlewares/auth.middleware'

const router = express.Router()

router.post('/', authenticateCookieMiddleware, validationMiddleware(CreateFoodDto), foodController.createFood)
router.get('/', authenticateCookieMiddleware, foodController.getAllFood)

export default router
