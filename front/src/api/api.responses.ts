export interface EmployeeResponse {
    id: string;
    firstName: string;
    secondName: string;
    position: string;
    age: number;
    phoneNumber: string;
    username: string;
    password: string;
}
export interface ErrorResponse {
    message: string;
}

export interface Animal {
    id: string;
    name: string;
    species: string;
    arriveDate: string;
    foodType: string;
    birthDate: string;
    country: string;

}
export interface AnimalDetails extends Animal{
    description: string;
    orders: Order[];
    careTaker: CareTaker;
}
export interface AnimalsResponse extends Array<Animal>{}

export interface Employee {
    id: string;
    firstName: string;
    secondName: string;
    position: string;
    age: number;
    phoneNumber: string;
    username: string;
}

export interface EmployeesResponse extends Array<Employee>{}
export interface FoodType {
    id: string;
    name: string;
    price: number;
}

export interface Order {
    id: string;
    foodType: FoodType;
    amount: number;
    totalPrice: number;
}

export interface CareTaker {
    id: string;
    firstName: string;
    secondName: string;
    position: string;
    age: number;
    phoneNumber: string;
    username: string;
}

