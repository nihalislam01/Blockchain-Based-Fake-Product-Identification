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
import UpdateStatusCallback from "../UpdateStatusCallback/UpdateStatusCallback";
import {useAuth} from  '../../common/utils/AuthContext';
import Dashboard from "../Dashboard/Dashboard";
import Product from "../Product/Product";
import OwnerRoute from "../../common/utils/OwnerRoute";
import UserRoute from "../../common/utils/UserRoute";
import CancelPlan from "../CancelPlan/CancelPlan";
import PaymentManager from "../PaymentManager/PaymentManager";
import UserManager from "../UserManager/UserManager";

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
        path: "/plan",
        element: <UserRoute><Plan /></UserRoute>
    },
    {
        path: "/business-form/:id",
        element: <UserRoute><BusinessForm /></UserRoute>
    },
    {
        path: "/business/updateStatus",
        element: <UserRoute><UpdateStatusCallback /></UserRoute>
    },
    {
        path: "/dashboard",
        element: <OwnerRoute><Dashboard /></OwnerRoute>
    },
    {
        path: "/product",
        element: <OwnerRoute><Product /></OwnerRoute>
    },
    {
        path: "/cancel-plan",
        element: <OwnerRoute><CancelPlan /></OwnerRoute>
    },
    {
        path: "/users",
        element: <UserManager />
    },
    {
        path: "/payment-manager",
        element: <PaymentManager />
    }
];

export default Main;
