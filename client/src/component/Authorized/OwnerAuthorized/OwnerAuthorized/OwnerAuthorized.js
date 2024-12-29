import React from "react";
import { Outlet } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Product from "../Product/Product";
import CancelPlan from "../CancelPlan/CancelPlan";

const OwnerAuthorized = () => {

    return <Outlet />
};

export const ownerRoutes = [
    {
        path: "/business/dashboard",
        element: <Dashboard />
    },
    {
        path: "/business/product",
        element: <Product />
    },
    {
        path: "/business/cancel-plan",
        element: <CancelPlan/>
    },
];

export default OwnerAuthorized;
