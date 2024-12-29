import React from "react";
import { Outlet } from "react-router-dom";
import Plan from "../Plan/Plan";
import BusinessForm from "../BusinessForm/BusinessForm";

const UserAuthorized = () => {

    return <Outlet />
};

export const userRoutes = [
    {
        path: "/user/plan",
        element: <Plan />
    },
    {
        path: "/user/business-form/:id",
        element: <BusinessForm />
    },
];

export default UserAuthorized;
