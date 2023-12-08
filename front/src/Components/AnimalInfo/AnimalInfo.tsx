import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiClient } from '../../api/api';
import { toast } from 'react-toastify';
import {AnimalDetails, FoodType, Order} from "../../api/api.responses";
import './AnimalInfo.css';
const AnimalPage: React.FC = () => {
    const { animalId } = useParams<{ animalId: string }>();
    const [animal, setAnimal] = useState<AnimalDetails | null>(null);
    const [foodOptions, setFoodOptions] = useState<FoodType[]>([]);
    const [selectedFoodId, setSelectedFoodId] = useState<string>('');
    const [orderAmount, setOrderAmount] = useState<number>(1);
    const fetchAnimal = async () => {
        try {
            const response = await apiClient.get<AnimalDetails>(`/animals/${animalId}`);
            setAnimal(response.data);
        } catch (error: any) {
            toast.error('Error fetching animal', error.message);
        }
    };
    useEffect(() => {
        fetchAnimal();
    }, [animalId]);

    useEffect(() => {
        const fetchFoodOptions = async () => {
            try {
                const response = await apiClient.get<FoodType[]>('/food');
                setFoodOptions(response.data);
            } catch (error: any) {
                toast.error('Error fetching food options', error.message);
            }
        };

        fetchFoodOptions();
    }, []);

    const handleOrderSubmit = async () => {
        try {
            if (!selectedFoodId) {
                toast.error('Please select a food type.');
                return;
            }

            const response = await apiClient.post('/orders', {
                animalId: animalId,
                foodId: selectedFoodId,
                amount: orderAmount,
            });

            toast.success('Order placed successfully!');
            fetchAnimal()
        } catch (error: any) {
            toast.error('Error placing order', error.message);
        }
    };

    if (!animal) {
        return <div>Loading...</div>;
    }

    return (
        <div className="animal-page">
            <h1 className="animal-name">{animal.name}</h1>

            <div className="animal-info">
                <p>Species: {animal.species}</p>
                <p>Arrival Date: {animal.arriveDate}</p>
                <p>Birth Date: {animal.birthDate}</p>
                <p>Country: {animal.country}</p>
                <p>Description: {animal.description}</p>
            </div>

            <div className="care-taker-info">
                <h2>Care Taker Information</h2>
                <p>Name: {animal.careTaker.firstName} {animal.careTaker.secondName}</p>
                <p>Position: {animal.careTaker.position}</p>
                <p>Age: {animal.careTaker.age}</p>
                <p>Phone Number: {animal.careTaker.phoneNumber}</p>
                <p>Username: {animal.careTaker.username}</p>
            </div>

            <div className="orders-info">
                <h2>Orders</h2>
                <ul>
                    {animal.orders.map((order:Order) => (
                        <li key={order.id} className="order-item">
                            <p>Food Type: {order.foodType.name}</p>
                            <p>Amount: {order.amount}</p>
                            <p>Total Price: {order.totalPrice}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="order-form">
                <h2>Place an Order</h2>
                <select
                    value={selectedFoodId}
                    onChange={(e) => setSelectedFoodId(e.target.value)}
                >
                    <option value="">Select Food Type</option>
                    {foodOptions.map((food) => (
                        <option key={food.id} value={food.id}>
                            {food.name} - ${food.price}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    min="1"
                    value={orderAmount}
                    onChange={(e) => setOrderAmount(parseInt(e.target.value, 10))}
                />
                <button onClick={handleOrderSubmit}>Place Order</button>
            </div>
        </div>
    );
};

export default AnimalPage;
