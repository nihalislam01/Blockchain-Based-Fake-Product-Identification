import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Message from "../components/Message/Message";
import { useAuth } from "./AuthContext";

const AuthenticatedRoute = ({ children, redirect }) => {

    const { checkAuth } = useAuth();
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const verifyAuth = async () => {
            const result = await checkAuth();
            setIsAuthenticated(result!=='unauthorized');
        };
        verifyAuth();
    }, [checkAuth]);

    if (isAuthenticated === null) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center w-100 min-vh-100">
                <Message headline="Loading..." message="Please be patient while the page loads" />
            </div>
        );
    }

    return isAuthenticated ? children : redirect || <Navigate to="/login" />;
};

export default AuthenticatedRoute;
