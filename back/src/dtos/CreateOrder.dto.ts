import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator'

export class CreateOrderDto {
  @IsNotEmpty()
  @IsUUID()
  animalId: string

  @IsNotEmpty()
  @IsUUID()
  foodId: string

  @IsNotEmpty()
  @IsNumber()
  amount: number
}
