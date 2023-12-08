import {apiClient} from "../../api/api";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {useAuth} from "../../AuthProvider/AuthProvider";
import React, {useEffect, useState} from "react";
import './Header.css';
const Header: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [temperature, setTemperature] = useState(null);
    const [currentDate, setCurrentDate] = useState<string>('');

    const handleLogout = async () => {
        await apiClient.post('/employees/logout', {});
        window.location.reload();
    };
    const getUserTimeZone = () => {
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        return userTimeZone;
    };
    const updateCurrentDate = () => {
        const now = new Date();
        const formattedDate = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(now);
        setCurrentDate(formattedDate);
    };
    useEffect(() => {
        const getUserLocation = async () => {
            try {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;
                    const apiKey = 'b3664610e3014864b71101414232311';

                    const response = await fetch(
                        `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`
                    );

                    if (response.ok) {
                        const data = await response.json();
                        setTemperature(data?.current?.temp_c);
                    } else {
                        console.error('Error fetching weather data');
                    }
                });
            } catch (error) {
                console.error('Error getting user location:', error);
            }
        };
        updateCurrentDate();
        getUserLocation();
    }, []);
    return (
        <div className="custom-header">
            <Link to="/animals">Home</Link>
            {isAuthenticated ? (
                <>
                     <span>
                    (Time Zone: {getUserTimeZone()}) | Today's Date: {currentDate} | Temperature: {temperature}°C
                        </span>
                    <Link to="/employees">Employees</Link>
                    <Link to="/create-animal">Create Animal</Link>
                    <Link to="/employees/me">Profile</Link>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <Link to="/login">Login</Link>
            )}
            <Outlet/>

        </div>
    );

};

export default Header;
