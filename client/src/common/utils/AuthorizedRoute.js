import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import Message from "../components/Message/Message";

const AutorizedRoute = ({ children, role }) => {

    const { checkAuth } = useAuth();
    const [authorizedRole, setAuthorizedRole] = useState(null);

    useEffect(() => {
        const verifyAuth = async () => {
            const result = await checkAuth();
            setAuthorizedRole(result);
        };
        verifyAuth();
    }, [checkAuth]);

    if (role === null) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center w-100" style={{minHeight: "80vh"}}>
                <Message headline="Loading..." message="Please be patient while the page loads" />
            </div>
        );
    }

    return role.includes(authorizedRole) ? children : (
        <div className="d-flex flex-column justify-content-center align-items-center w-100" style={{minHeight: "80vh"}}>
            <Message headline="Unauthorized" message="You don't have access to view this page" />
        </div>
    );
};

export default AutorizedRoute;