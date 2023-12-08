import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import { EmployeeEntity } from './employee.entity'
import { OrderEntity } from './order.entity'

export enum AnimalType {
  CAT = 'cat',
  DAWG = 'dawg',
}

@Entity('animals')
export class AnimalEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  species: string

  @Column('date')
  arriveDate: Date

  @Column()
  foodType: string

  @Column('date')
  birthDate: Date

  @Column()
  country: string

  @ManyToOne(() => EmployeeEntity, (employee) => employee.id, { onDelete: 'SET NULL' })
  careTaker: EmployeeEntity

  @OneToMany(() => OrderEntity, (order) => order.animal)
  orders: OrderEntity[]

  @Column()
  description: string
}
