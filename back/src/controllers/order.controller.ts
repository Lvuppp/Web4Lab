import { NextFunction, Response, Request } from 'express'
import { orderService } from '../services/order.service'
import { CreateOrderDto } from '../dtos/CreateOrder.dto'

export class OrderController {
  async getAllOrdersForAnimal(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const allOrders = await orderService.getAllOrders()
      res.json(allOrders)
    } catch (error) {
      next(error)
    }
  }

  async createOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto: CreateOrderDto = req.body
      const newOrder = await orderService.createOrder(dto)
      res.status(201).json(newOrder)
    } catch (error) {
      next(error)
    }
  }
}

export const orderController = new OrderController()
