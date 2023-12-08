import express from 'express'
import { validationMiddleware } from '../middlewares/validation.middleware'
import { CreateOrderDto } from '../dtos/CreateOrder.dto'
import { orderController } from '../controllers/order.controller'
import { authenticateCookieMiddleware } from '../middlewares/auth.middleware'

const router = express.Router()

router.post('/', authenticateCookieMiddleware, validationMiddleware(CreateOrderDto), orderController.createOrder)
router.get('/', authenticateCookieMiddleware, orderController.getAllOrdersForAnimal)

export default router
