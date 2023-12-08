import { CustomError } from '../middlewares/error.middleware'
import { OrderEntity } from '../entities/order.entity'
import { CreateOrderDto } from '../dtos/CreateOrder.dto'
import { dataSource } from '../dataSource'
import { AnimalEntity } from '../entities/animal.entity'
import { FoodEntity } from '../entities/food.entity'

export class OrderService {
  private orderRepository = dataSource.getRepository(OrderEntity)
  private animalRepository = dataSource.getRepository(AnimalEntity)
  private foodRepository = dataSource.getRepository(FoodEntity)

  async getAllOrders(): Promise<OrderEntity[]> {
    try {
      return this.orderRepository.find()
    } catch (error) {
      throw new CustomError(`Error while fetching orders: ${(error as Error).message}`, 500)
    }
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    try {
      const animal = await this.animalRepository.findOneBy({ id: createOrderDto.animalId })
      if (!animal) {
        throw new CustomError('Animal not found', 404)
      }

      const food = await this.foodRepository.findOneBy({ id: createOrderDto.foodId })
      if (!food) {
        throw new CustomError('Food not found', 404)
      }

      const newOrder = this.orderRepository.create({
        animal,
        foodType: food,
        amount: createOrderDto.amount,
        totalPrice: food.price * createOrderDto.amount,
      })

      return this.orderRepository.save(newOrder)
    } catch (error) {
      throw new CustomError(`Error while creating order: ${(error as Error).message}`, 500)
    }
  }
}

export const orderService = new OrderService()
