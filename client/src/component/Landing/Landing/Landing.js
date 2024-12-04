import {Outlet} from "react-router-dom";
import Login from '../Login/Login';
import React from "react";
import Email from "../Email/Email";
import Navbar from "../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import Signup from "../Signup/Signup";
import Callback from "../Callback/Callback";

function Landing() {
    return (
        <>
            <section className={`w-100 min-vh-100`}>
                <Navbar />
                <Outlet/>
                <Footer />
            </section>
        </>
    );
}

export const landingRoutes = [
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/forgot-password",
        element: <Email />
    },
    {
        path: "/verify-email",
        element: <Callback />
    }
];

export default Landing;