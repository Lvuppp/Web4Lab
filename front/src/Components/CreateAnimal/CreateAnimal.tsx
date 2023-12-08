import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import {Link, useNavigate} from 'react-router-dom';
import {apiClient} from "../../api/api";
import {CreateAnimalBody} from "../../api/api.requests";
import {toast} from "react-toastify";
import {Animal, EmployeesResponse} from "../../api/api.responses";
import * as yup from 'yup';
import './CreateAnimal.css';
const CreateAnimal: React.FC = () => {
    const [careTakers, setCareTakers] = useState<EmployeesResponse>([]);
    const [selectedCareTaker, setSelectedCareTaker] = useState<string>('');
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCareTakers = async () => {
            try {
                const response = await apiClient.get<EmployeesResponse>('/employees');
                setCareTakers(response.data);
            } catch (error: any) {
                toast.error('Error fetching care takers', error.message);
            }
        };

        fetchCareTakers();
    }, []);

    const formik = useFormik({
        initialValues: {
            name: '',
            species: '',
            arriveDate: '',
            foodType: '',
            birthDate: '',
            country: '',
            careTakerId: selectedCareTaker, // Устанавливаем текущего пользователя по умолчанию
            description: '',
        },
        validationSchema: yup.object({
            name: yup.string().required('Name is required'),
            species: yup.string().required('Species is required'),
            arriveDate: yup.date().required('Arrival Date is required'),
            foodType: yup.string().required('Food Type is required'),
            birthDate: yup.date().required('Birth Date is required'),
            country: yup.string().required('Country is required'),
            careTakerId: yup.string().required('Care Taker is required'),
            description: yup.string().required('Description is required'),
        }),
        onSubmit: async (values: CreateAnimalBody) => {
            try {
                const response = await apiClient.post<Animal>('/animals', values);
                toast.success(`Animal created with id ${response.data.id}`);
                navigate('/animals');
            } catch (error: any) {
                toast.error('Error creating animal', error.message);
            }
        },
    });

    return (
        <div>
            <h1>Create Animal</h1>

            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Animal Name"
                        {...formik.getFieldProps('name')}
                    />
                    {formik.touched.name && formik.errors.name && (
                        <div className="error">{formik.errors.name}</div>
                    )}
                </div>

                <div>
                    <label htmlFor="species">Species:</label>
                    <input
                        type="text"
                        id="species"
                        placeholder="Animal Species"
                        {...formik.getFieldProps('species')}
                    />
                    {formik.touched.species && formik.errors.species && (
                        <div className="error">{formik.errors.species}</div>
                    )}
                </div>

                <div>
                    <label htmlFor="arriveDate">Arrival Date:</label>
                    <input
                        type="text"
                        id="arriveDate"
                        placeholder="Arrival Date"
                        {...formik.getFieldProps('arriveDate')}
                    />
                    {formik.touched.arriveDate && formik.errors.arriveDate && (
                        <div className="error">{formik.errors.arriveDate}</div>
                    )}
                </div>

                <div>
                    <label htmlFor="foodType">Food Type:</label>
                    <input
                        type="text"
                        id="foodType"
                        placeholder="Food Type"
                        {...formik.getFieldProps('foodType')}
                    />
                    {formik.touched.foodType && formik.errors.foodType && (
                        <div className="error">{formik.errors.foodType}</div>
                    )}
                </div>

                <div>
                    <label htmlFor="birthDate">Birth Date:</label>
                    <input
                        type="text"
                        id="birthDate"
                        placeholder="Birth Date"
                        {...formik.getFieldProps('birthDate')}
                    />
                    {formik.touched.birthDate && formik.errors.birthDate && (
                        <div className="error">{formik.errors.birthDate}</div>
                    )}
                </div>

                <div>
                    <label htmlFor="country">Country:</label>
                    <input
                        type="text"
                        id="country"
                        placeholder="Country"
                        {...formik.getFieldProps('country')}
                    />
                    {formik.touched.country && formik.errors.country && (
                        <div className="error">{formik.errors.country}</div>
                    )}
                </div>
                <div>
                    <label htmlFor="careTakerId">Care Taker:</label>
                    <select
                        id="careTakerId"
                        {...formik.getFieldProps('careTakerId')}
                        onChange={(e) => {
                            formik.handleChange(e);
                            setSelectedCareTaker(e.target.value);
                        }}
                    >
                        <option value="">Select Care Taker</option>
                        {careTakers.map((careTaker) => (
                            <option key={careTaker.id} value={careTaker.id}>
                                {careTaker.firstName} {careTaker.secondName}
                            </option>
                        ))}
                    </select>
                    {formik.touched.careTakerId && formik.errors.careTakerId && (
                        <div className="error">{formik.errors.careTakerId}</div>
                    )}
                </div>

                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        placeholder="Animal Description"
                        {...formik.getFieldProps('description')}
                    />
                    {formik.touched.description && formik.errors.description && (
                        <div className="error">{formik.errors.description}</div>
                    )}
                </div>

                <button type="submit" disabled={formik.isSubmitting}>
                    Create Animal
                </button>
            </form>


            <button onClick={() => navigate(-1)}>
                Go Back
            </button>
        </div>
    );
};

export default CreateAnimal;
