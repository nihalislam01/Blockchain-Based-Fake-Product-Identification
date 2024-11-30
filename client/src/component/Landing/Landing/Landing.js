import {Outlet} from "react-router-dom";
import Login from '../Login/Login';
import React from "react";
import Email from "../Email/Email";

function Landing() {
    return (
        <>
            <section className={`container w-100 min-vh-100`}>
                <Outlet/>
            </section>
        </>
    );
}

export const landingRoutes = [
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/verify-email",
        element: <Email />
    }
];

export default Landing;