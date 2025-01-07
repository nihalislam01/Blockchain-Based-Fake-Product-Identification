import {Outlet} from "react-router-dom";
import Login from '../Login/Login';
import React from "react";
import Email from "../Email/Email";
import Navbar from "../Navbar/Navbar";
import Footer from "../../../common/components/Footer/Footer";
import Signup from "../Signup/Signup";
import Password from "../Password/Password";
import Home, { unAuthenticatedHomePages } from "../../Authenticated/Home/Home/Home";
import "./Landing.scss";

function Landing() {
    return (
        <>
            <Navbar />
            <div className="main-content">
                <Outlet/>
            </div>
            <Footer />
        </>
    );
}

export const landingRoutes = [
    {
        path: "/",
        element: <Home />,
        children: unAuthenticatedHomePages
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/forgot-password",
        element: <Email />
    },
    {
        path: "/reset-password",
        element: <Password />
    },
];

export default Landing;