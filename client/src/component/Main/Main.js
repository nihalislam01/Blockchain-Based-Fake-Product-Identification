import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Profile from "../Profile/Profile/Profile";
import './Main.scss';
import Navbar from "../Navbar/Navbar";
import Home, { homePages } from "../Home/Home";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import Plan from "../Plan/Plan";
import BusinessForm from "../BusinessForm/BusinessForm";
import Status from "../Status/Status";
import {useAuth} from  '../../common/utils/AuthContext';
import Dashboard from "../Dashboard/Dashboard";
import Product from "../Product/Product";
import CancelPlan from "../CancelPlan/CancelPlan";
import PaymentManager from "../PaymentManager/PaymentManager";
import BusinessManager from "../BusinessManager/BusinessManager";
import UserManager from "../UserManager/UserManager";
import AuthorizedRoute from "../../common/utils/AuthorizedRoute";
import Notification from "../Authenticated/Notification/Notification";

const Main = () => {

    const {checkAuth} = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [role, setRole] = useState("");

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(()=>{
        const auth = async () => {
            const result = await checkAuth();
            setRole(result);
        }
        auth();
    },[checkAuth])

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            {(role==='owner' || role==='admin') && <Sidebar role={role} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>}
            <main className={`mainContainer`}>
                <Navbar toggleSidebar={toggleSidebar} isOwner={role==='owner'} isSidebarOpen={isSidebarOpen}/>
                <div className={`main-body ${(role==='owner' || role==='admin')?"authorized":""}`}>
                    <Outlet />
                </div>
                <Footer />
            </main>
        </div>
    );
};

export const authenticatedRoutes = [
    {
        path: "/",
        element: <Home />,
        children: homePages
    },
    {
        path: "/profile",
        element: <Profile />
    },
    {
        path: "/status",
        element: <Status />
    },
    {
        path: "/notification",
        element: <Notification />
    },
    {
        path: "/plan",
        element: <AuthorizedRoute role={["user"]}><Plan /></AuthorizedRoute>
    },
    {
        path: "/business-form/:id",
        element: <AuthorizedRoute role={["user"]}><BusinessForm /></AuthorizedRoute>
    },
    {
        path: "/dashboard",
        element: <AuthorizedRoute role={["owner"]}><Dashboard /></AuthorizedRoute>
    },
    {
        path: "/product",
        element: <AuthorizedRoute role={["owner"]}><Product /></AuthorizedRoute>
    },
    {
        path: "/cancel-plan",
        element: <AuthorizedRoute role={["owner"]}><CancelPlan/></AuthorizedRoute>
    },
    {
        path: "/user-manager",
        element: <AuthorizedRoute role={["admin"]}><UserManager /></AuthorizedRoute>
    },
    {
        path: "/business-manager",
        element: <AuthorizedRoute role={["admin"]}><BusinessManager /></AuthorizedRoute>
    },
    {
        path: "/payment-manager",
        element: <AuthorizedRoute role={["admin"]}><PaymentManager /></AuthorizedRoute>
    }
];

export default Main;
