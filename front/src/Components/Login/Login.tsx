import React, {useState} from "react";
import './Login.css';
import * as yup from 'yup';
import {useFormik} from "formik";
import {toast} from 'react-toastify';
import {FaUser, FaLock, FaEnvelope, FaPhone} from 'react-icons/fa';
import {apiClient} from "../../api/api";
import {EmployeeResponse} from "../../api/api.responses";
import {useNavigate} from "react-router-dom";


const phoneRegExp = /^\+((\\d{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export enum EmployeePositions {
    MANAGER = 'manager',
    WORKER = 'worker',
}

const loginValidationSchema = yup.object({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
});
const signupValidationSchema = yup.object({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
    firstName: yup.string().required('First Name is required'),
    phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    position: yup.string().oneOf(Object.values(EmployeePositions)).required('Position is required'),
    age: yup.number().min(1).max(100).required('Age is required'),
    secondName: yup.string().required('Second Name is required'),
});
const LoginSignUp = () => {
        const [action, setAction] = useState('Login');
        const navigate = useNavigate();
        const validationSchema = action === 'Login' ? loginValidationSchema : signupValidationSchema;

        const formik = useFormik({
            initialValues: {
                username:'',
                password: '',
                firstName: '',
                secondName: '',
                phoneNumber: '',
                position: EmployeePositions.WORKER,
                age: 1
            },
            validationSchema: validationSchema,
            onSubmit: async (values: any) => {
                try {
                    if (action === 'Login') {
                        const response = await apiClient.post<{
                            message: string,
                            employee: EmployeeResponse
                        }>('/employees/login', {
                            username: values.username,
                            password: values.password,
                        })
                    } else {
                        const response = await apiClient.post<{
                            message: string;
                            employee: EmployeeResponse;
                        }>('/employees/register', {
                            username: values.username,
                            password: values.password,
                            firstName: values.firstName,
                            secondName: values.secondName,
                            age: values.age,
                            position: values.position,
                            phoneNumber: values.phoneNumber,
                        });
                    }
                    navigate('/animals')
                    window.location.reload();
                } catch (error: any) {
                    toast.error(`Error: ${error.message}`, {
                        position: toast.POSITION.TOP_CENTER,
                    });
                }
            }
        });
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="container">
                <div className="header">
                    <div className="text">{action}</div>
                    <div className="underline" />
                    <div className="input">
                        <FaUser />
                        <input
                            type="text"
                            placeholder="Username"
                            {...formik.getFieldProps('username')}
                            style={{ borderColor: formik.touched.username && formik.errors.username ? 'red' : '' }}
                        />
                        {formik.touched.username && formik.errors.username && (
                            <div className="error">{formik.errors.username}</div>
                        )}
                    </div>

                    <div className="input">
                        <FaLock />
                        <input
                            type="password"
                            placeholder="Password"
                            {...formik.getFieldProps('password')}
                            style={{ borderColor: formik.touched.password && formik.errors.password ? 'red' : '' }}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <div className="error">{formik.errors.password}</div>
                        )}
                    </div>

                    {action === 'Sign Up' && (
                        <>
                            <div className="input">
                                <FaUser />
                                <input
                                    type="text"
                                    id="firstName"
                                    placeholder="First Name"
                                    {...formik.getFieldProps('firstName')}
                                    style={{
                                        borderColor: formik.touched.firstName && formik.errors.firstName ? 'red' : '',
                                    }}
                                />
                                {formik.touched.firstName && formik.errors.firstName && (
                                    <div className="error">{formik.errors.firstName}</div>
                                )}
                            </div>
                            <div className="input">
                                <FaUser />
                                <input
                                    type="text"
                                    id="lastName"
                                    placeholder="Last Name"
                                    {...formik.getFieldProps('secondName')}
                                    style={{
                                        borderColor: formik.touched.secondName && formik.errors.secondName ? 'red' : '',
                                    }}
                                />
                                {formik.touched.secondName && formik.errors.secondName && (
                                    <div className="error">{formik.errors.secondName}</div>
                                )}
                            </div>
                            <div className="input">
                                <FaPhone />
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    placeholder="Phone Number"
                                    {...formik.getFieldProps('phoneNumber')}
                                    style={{
                                        borderColor:
                                            formik.touched.phoneNumber && formik.errors.phoneNumber ? 'red' : '',
                                    }}
                                />
                                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                                    <div className="error">{formik.errors.phoneNumber}</div>
                                )}
                            </div>
                            <div className="input">
                                <FaUser />
                                <select
                                    id="position"
                                    {...formik.getFieldProps('position')}
                                    style={{
                                        borderColor: formik.touched.position && formik.errors.position ? 'red' : '',
                                        padding: '8px',
                                        fontSize: '16px',
                                        borderRadius: '4px',
                                    }}
                                >
                                    <option value={EmployeePositions.WORKER}>Worker</option>
                                    <option value={EmployeePositions.MANAGER}>Manager</option>
                                </select>
                                {formik.touched.position && formik.errors.position && (
                                    <div className="error">{formik.errors.position}</div>
                                )}
                            </div>

                            <div className="input">
                                <FaUser />
                                <input
                                    type="number"
                                    id="age"
                                    placeholder="Age"
                                    {...formik.getFieldProps('age')}
                                    style={{
                                        borderColor: formik.touched.age && formik.errors.age ? 'red' : '',
                                    }}
                                />
                                {formik.touched.age && formik.errors.age && (
                                    <div className="error">{formik.errors.age}</div>
                                )}
                            </div>
                        </>
                    )}
                </div>
                <div className="submit-container">
                    <div
                        className={action === 'Login' ? 'submit gray' : 'submit'}
                        onClick={() => setAction('Sign Up')}
                    >
                        Sign Up
                    </div>
                    <div
                        className={action === 'Sign Up' ? 'submit gray' : 'submit'}
                        onClick={() => setAction('Login')}
                    >
                        Login
                    </div>
                </div>
                <button type="submit" className="submitButton">
                    Submit
                </button>
            </div>
        </form>
    );
};
export default LoginSignUp;