import { IsNotEmpty, IsString, MinLength, IsAlphanumeric, IsEnum, IsNumber, IsPhoneNumber } from 'class-validator'
import { EmployeePositions } from '../entities/employee.entity'

export class CreateEmployeeDto {
  @IsNotEmpty({ message: 'First name should not be empty' })
  @IsString({ message: 'First name should be a string' })
  firstName: string

  @IsNotEmpty({ message: 'Last name should not be empty' })
  @IsString({ message: 'Last name should be a string' })
  secondName: string

  @IsNotEmpty({ message: 'Position should not be empty' })
  @IsEnum(EmployeePositions, { message: 'Invalid position' })
  position: EmployeePositions

  @IsNotEmpty({ message: 'Age should not be empty' })
  @IsNumber({}, { message: 'Age should be a number' })
  age: number

  @IsNotEmpty({ message: 'Phone number should not be empty' })
  @IsPhoneNumber(undefined, { message: 'Invalid phone number' })
  phoneNumber: string

  @IsString({ message: 'Username should be a string' })
  @IsAlphanumeric(undefined, { message: 'Username should contain only letters and numbers' })
  username: string

  @IsString({ message: 'Password should be a string' })
  @MinLength(6, { message: 'Password should be at least 6 characters long' })
  password: string
}
