
import React, { createContext, useContext, useState, useEffect } from 'react';
import {Employee} from "../api/api.responses";
import {apiClient} from "../api/api";

interface AuthContextType {
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false);

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

    return <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>;
};

const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthProvider, useAuth };
