import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import './Authenticated.scss';

import Sidebar from "../../Authorized/Sidebar/Sidebar";

import Navbar from "../Navbar/Navbar";
import Home, { homePages } from "../Home/Home/Home";
import Notification from "../Notification/Notification";
import Profile from "../Profile/Profile";
import Status from "../Status/Status";

import Footer from "../../../common/components/Footer/Footer";

import {useAuth} from  '../../../common/utils/AuthContext';
import AuthorizedRoute from "../../../common/utils/AuthorizedRoute";

import OwnerAuthorized, { ownerRoutes } from "../../Authorized/OwnerAuthorized/OwnerAuthorized/OwnerAuthorized";
import UserAuthorized, { userRoutes } from "../../Authorized/UserAuthorized/UserAuthorized/UserAuthorized";
import AdminAuthorized, { adminRoutes } from "../../Authorized/AdminAuthorized/AdminAuthorized/AdminAuthorized";
import EventCalendar from "../../Authorized/Calendar/Calendar";

const Authenticated = () => {

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
            <main className={`main-container `}>
                <Navbar toggleSidebar={toggleSidebar} isOwner={role==='owner'} isSidebarOpen={isSidebarOpen}/>
                <div className={`main-body ${(role==='owner' || role==='admin') ? "authorized" : ""}`}>
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
        path: "/notification",
        element: <Notification />
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
        path: "/calendar",
        element: <AuthorizedRoute roles={["admin", "owner"]}><EventCalendar /></AuthorizedRoute>
    },
    {
        path: "/user",
        element: <AuthorizedRoute roles={["user"]}><UserAuthorized /></AuthorizedRoute>,
        children: userRoutes
    },
    {
        path: "/business",
        element: <AuthorizedRoute roles={["owner"]}><OwnerAuthorized /></AuthorizedRoute>,
        children: ownerRoutes
    },
    {
        path: "/admin",
        element: <AuthorizedRoute roles={["admin"]}><AdminAuthorized /></AuthorizedRoute>,
        children: adminRoutes
    },
];

export default Authenticated;