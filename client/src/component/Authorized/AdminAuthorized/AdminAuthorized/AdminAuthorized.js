import React from "react";
import { Outlet } from "react-router-dom";
import PaymentManager from "../PaymentManager/PaymentManager";
import BusinessManager from "../BusinessManager/BusinessManager";
import UserManager from "../UserManager/UserManager";

const AdminAuthorized = () => {

    return <Outlet />
};

export const adminRoutes = [
    {
        path: "/admin/user-manager",
        element: <UserManager />
    },
    {
        path: "/admin/business-manager",
        element: <BusinessManager />
    },
    {
        path: "/admin/payment-manager",
        element: <PaymentManager />
    }
];

export default AdminAuthorized;
