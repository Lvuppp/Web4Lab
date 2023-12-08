import { EmployeePositions } from '../entities/employee.entity'
import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator'

export class UpdateEmployeeDto {
  @IsOptional()
  @IsString()
  firstName?: string

  @IsOptional()
  @IsString()
  secondName?: string

  @IsOptional()
  @IsEnum(EmployeePositions)
  position?: EmployeePositions

  @IsOptional()
  @IsNumber()
  age?: number

  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string

  @IsOptional()
  @IsArray()
  @ArrayUnique({ message: 'Facility IDs must be unique' })
  @IsUUID(undefined, { each: true, message: 'Each facility ID must be a valid UUID' })
  facilities?: string[]
}
