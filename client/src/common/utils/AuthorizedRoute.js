import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import Message from "../components/Message/Message";

const AuthorizedRoute = ({ children, roles }) => {

    const { checkAuth } = useAuth();
    const [authorizedRole, setAuthorizedRole] = useState(null);

    useEffect(() => {
        const verifyAuth = async () => {
            const result = await checkAuth();
            setAuthorizedRole(result);
        };
        verifyAuth();
    }, [checkAuth]);

    if (roles === null) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center w-100" style={{minHeight: "80vh"}}>
                <Message headline="Loading..." message="Please be patient while the page loads" />
            </div>
        );
    }

    return roles.includes(authorizedRole) ? children : (
        <div className="d-flex flex-column justify-content-center align-items-center w-100" style={{minHeight: "80vh"}}>
            <Message headline="Unauthorized" message="You don't have access to view this page" />
        </div>
    );
};

export default AuthorizedRoute;