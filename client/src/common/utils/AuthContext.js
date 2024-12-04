import axios from "axios";
import React, { createContext, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const checkAuth = async () => {
        try {
            await axios.get('/api/user/check');
            return true;
        } catch (error) {
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{ checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
