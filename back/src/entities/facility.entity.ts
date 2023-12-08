import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm'
import { EmployeeEntity } from './employee.entity'

@Entity('facilities')
export class FacilityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column()
  animalSpecies: string

  @Column()
  isHeated: boolean

  @ManyToMany(() => EmployeeEntity, (employee) => employee.facilities)
  employees: EmployeeEntity[]
}
