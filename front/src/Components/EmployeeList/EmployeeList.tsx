import React, { useState, useEffect } from 'react';
import { Employee, EmployeesResponse } from '../../api/api.responses';
import './EmployeeList.css';
import {apiClient} from "../../api/api";
import axios from "axios";
function EmployeeList() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [memeUrl, setMemeUrl] = useState<string>('');

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await apiClient.get<EmployeesResponse>('/employees');
                setEmployees(response.data);
            } catch (error: any) {
                console.error('Error fetching employees', error.message);
            }
        };

        const fetchMeme = async () => {
            try {
                const templates = ['buzz', 'iw', 'af', 'cb', 'ds', 'fa', 'fbf', 'fry', 'ggg', 'grumpycat'];
                const texts = ['React', 'Hooks', 'API', 'Memes', 'Images', 'Employees', 'Fun', 'Coding', 'Bing', 'Help'];
                const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
                const randomText1 = texts[Math.floor(Math.random() * texts.length)];
                const randomText2 = texts[Math.floor(Math.random() * texts.length)];

                const memeUrl = `https://api.memegen.link/images/${randomTemplate}/${randomText1}/${randomText2}.png`;

                const response = await axios.get(memeUrl);
                setMemeUrl(response.request.responseURL);
            } catch (error: any) {
                console.error('Error fetching meme', error.message);
            }
        };

        fetchEmployees();
        fetchMeme();
    }, []);

    return (
        <div className='employee-list'>
            <h1>Employee List</h1>
            <ul>
                {employees.map((employee) => (
                    <li key={employee.id} className='employee-item'>
                        <p>
                            <strong>Name:</strong> {employee.firstName} {employee.secondName}
                        </p>
                        <p>
                            <strong>Position:</strong> {employee.position}
                        </p>
                        <p>
                            <strong>Age:</strong> {employee.age}
                        </p>
                        <p>
                            <strong>Phone Number:</strong> {employee.phoneNumber}
                        </p>
                        <p>
                            <strong>Username:</strong> {employee.username}
                        </p>
                    </li>
                ))}
            </ul>
            <div className='meme-container'>
                <h2>Random Meme</h2>
                <img src={memeUrl} alt='Meme' />
            </div>
        </div>
    );
};

export default EmployeeList;
