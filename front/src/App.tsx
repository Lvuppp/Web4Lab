import React from 'react';
import './App.css';
import LoginSignUp from "./Components/Login/Login";
import AnimalCatalogPage from "./Components/AnimalsPage/AnimalPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CreateAnimal from "./Components/CreateAnimal/CreateAnimal";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import AnimalInfo from "./Components/AnimalInfo/AnimalInfo";
import Header from "./Components/Header/Header";
import {AuthProvider} from "./AuthProvider/AuthProvider";
import UserProfile from "./Components/UserProfile/UserProfile";
import {CookiesProvider} from "react-cookie";
import EmployeeList from "./Components/EmployeeList/EmployeeList";

function App() {
    return (

        <BrowserRouter>
            <AuthProvider>
                <Header/>
                <Routes>
                    <Route path='/animals' element={<AnimalCatalogPage/>}/>
                    <Route path='/login' element={<LoginSignUp/>}/>
                    <Route path="/create-animal" element={<PrivateRoute element={<CreateAnimal/>}/>}/>
                    <Route path="/animals/:animalId" element={<PrivateRoute element={<AnimalInfo/>}/>}/>
                    <Route path="/employees/me" element={<PrivateRoute element={<UserProfile/>}/>}/>
                    <Route path="/employees/" element={<PrivateRoute element={<EmployeeList/>}/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
