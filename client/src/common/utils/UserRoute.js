import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import Message from "../components/Message/Message";

const UserRoute = ({ children }) => {

    const { checkAuth } = useAuth();
    const [isUser, setIsUser] = useState(null);

    useEffect(() => {
        const verifyAuth = async () => {
            const result = await checkAuth();
            setIsUser(result==='user');
        };
        verifyAuth();
    }, [checkAuth]);

    if (isUser === null) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center w-100" style={{minHeight: "80vh"}}>
                <Message headline="Loading..." message="Please be patient while the page loads" />
            </div>
        );
    }

    return isUser ? children : (
        <div className="d-flex flex-column justify-content-center align-items-center w-100" style={{minHeight: "80vh"}}>
            <Message headline="Unauthorized" message="You don't have access to view this page" />
        </div>
    );
};

export default UserRoute;