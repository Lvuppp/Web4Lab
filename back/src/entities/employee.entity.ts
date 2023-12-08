import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm'
import { FacilityEntity } from './facility.entity'

export enum EmployeePositions {
  MANAGER = 'manager',
  WORKER = 'worker',
}

@Entity('employees')
export class EmployeeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  firstName: string

  @Column()
  secondName: string

  @Column({
    type: 'enum',
    enum: EmployeePositions,
  })
  position: EmployeePositions

  @Column()
  age: number

  @Column()
  phoneNumber: string

  @ManyToMany(() => FacilityEntity, (facility) => facility.employees, { nullable: true })
  @JoinTable()
  facilities: FacilityEntity[]

  @Column({ unique: true })
  username: string

  @Column({ select: false })
  password: string
}
