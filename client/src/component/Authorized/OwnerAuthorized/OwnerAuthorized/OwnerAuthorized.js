import React from "react";
import { Outlet } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Product from "../Product/Product";
import CancelPlan from "../CancelPlan/CancelPlan";
import Rule from "../Rule/Rule";
import UploadProduct from "../Product/UploadProduct";

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
    {
        path: "/business/rule-book",
        element: <Rule />
    },
];

export const businessHomeRoutes = [
    {
        path: "/business/upload",
        element: <UploadProduct />
    },
];

export default OwnerAuthorized;
