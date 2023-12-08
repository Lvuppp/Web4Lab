import React, {useEffect, useState} from "react";
import {apiClient} from "../api/api";
import {Employee} from "../api/api.responses";
import {Navigate} from "react-router-dom";

const PrivateRoute: React.FC<any> = ({ element, ...rest }) => {
    const [isAuthenticated, setAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await apiClient.get<Employee>('/employees/me');

                setAuthenticated(response.status === 200);
            } catch (error) {
                setAuthenticated(false);
            }
        };

        checkAuthentication();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? element : <Navigate to="/login" replace />;
};
export default PrivateRoute;