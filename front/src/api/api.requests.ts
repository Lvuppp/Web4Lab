import {EmployeePositions} from "../Components/Login/Login";

export interface CreateAnimalBody {
    name: string;
    species: string;
    arriveDate: string;
    foodType: string;
    birthDate: string;
    country: string;
    careTakerId: string;
    description: string;
}

export interface CreateOrderBody {
    animalId: string;
    foodId: string;
    amount: number;
}
export interface UpdateEmployeeDto {
    firstName?: string;
    secondName?: string;
    position?: EmployeePositions;
    age?: number;
    phoneNumber?: string;
    facilities?: string[];
}