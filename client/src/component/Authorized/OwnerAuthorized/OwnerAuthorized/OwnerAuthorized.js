import React from "react";
import { Outlet } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Product from "../Product/Product";
import CancelPlan from "../CancelPlan/CancelPlan";
import EventCalendar from "../Calendar/Calendar";
import Rule from "../Rule/Rule";

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
        path: "/business/calendar",
        element: <EventCalendar/>
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

export default OwnerAuthorized;
