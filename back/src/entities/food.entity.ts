import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('foods')
export class FoodEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column('decimal', { precision: 5, scale: 2 })
  price: number
}
