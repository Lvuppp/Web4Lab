import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { FoodEntity } from './food.entity'
import { AnimalEntity } from './animal.entity'

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => FoodEntity, (food) => food.id)
  foodType: FoodEntity

  @Column()
  amount: number

  @ManyToOne(() => AnimalEntity, (animal) => animal.id)
  animal: AnimalEntity

  @Column('decimal', { precision: 8, scale: 2 })
  totalPrice: number
}
