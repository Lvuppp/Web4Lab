import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthProvider/AuthProvider';
import { apiClient } from '../../api/api';
import { Employee } from '../../api/api.responses';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';
import {toast} from "react-toastify";
const UserProfile: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const [user, setUser] = useState<Employee | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await apiClient.get<{ employee: Employee }>(`/employees/me`);
                setUser(response.data.employee);
            } catch (error: any) {
                console.error('Error fetching current user', error.message);
            }
        };

        if (isAuthenticated) {
            fetchCurrentUser();
        }
    }, [isAuthenticated]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const updatedValue = name === 'age' ? parseInt(value, 10) : value;

        setUser((prevUser) => ({ ...(prevUser as Employee), [name]: updatedValue }));
    };


    const handleUpdateProfile = async () => {
        try {
            await apiClient.put(`/employees/${user?.id}`, user);
            toast.success('Successfully updated profile')
        } catch (error: any) {
            toast.error('Error updating user profile', error.message);
        }
    };

    const handleDeleteProfile = async () => {
        try {
            await apiClient.delete(`/employees/${user?.id}`);
            navigate('/animals');
            window.location.reload();
        } catch (error: any) {
            toast.error('Error deleting user profile', error.message);
        }
    };

    if (!isAuthenticated) {
        return <div>Please log in to view your profile.</div>;
    }

    return (
        <div className="user-profile">
            <h1>User Profile</h1>
            {user && (
                <div className="profile-details">
                    <div>
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={user.firstName || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="secondName">Last Name:</label>
                        <input
                            type="text"
                            id="secondName"
                            name="secondName"
                            value={user.secondName || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="position">Position:</label>
                        <input
                            type="text"
                            id="position"
                            name="position"
                            value={user.position || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="age">Age:</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={user.age || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={user.phoneNumber || ''}
                            onChange={handleInputChange}
                        />
                    </div>

                    <button className="update-profile-btn" onClick={handleUpdateProfile}>
                        Update Profile
                    </button>
                    <button className="delete-profile-btn" onClick={handleDeleteProfile}>
                        Delete Profile
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
