import { IsNotEmpty, IsDateString, IsEnum, IsString, IsUUID } from 'class-validator'
import { AnimalType } from '../entities/animal.entity'

export class CreateAnimalDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  species: string

  @IsDateString()
  arriveDate: Date

  @IsNotEmpty()
  foodType: string

  @IsDateString()
  birthDate: Date

  @IsNotEmpty()
  country: string

  @IsUUID()
  careTakerId: string

  @IsString()
  description: string
}
