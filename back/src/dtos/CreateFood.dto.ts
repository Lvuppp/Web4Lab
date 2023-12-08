import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateFoodDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsNumber()
  price: number
}
