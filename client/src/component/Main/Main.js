import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Profile from "../Profile/Profile/Profile";
import './Main.scss';
import Navbar from "../Navbar/Navbar";
import Dashboard from "../Dashboard/Dashboard";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import Product from "../Product/Product";
import Plan from "../Plan/Plan";
import BusinessForm from "../BusinessForm/BusinessForm";
import UpdateStatusCallback from "../UpdateStatusCallback/UpdateStatusCallback";

const Main = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(()=>{
    },[])

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
            <main className={`mainContainer`} style={{marginLeft: isSidebarOpen ? "250px" : "0"}}>
                <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} style={{marginLeft: isSidebarOpen ? "250px" : "0"}}/>
                <div className="main-body">
                    <Outlet />
                </div>
                <Footer />
            </main>
        </div>
    );
};

export const authenticatedRoutes = [
    {
        path: "/dashboard",
        element: <Dashboard />
    },
    {
        path: "/profile",
        element: <Profile />
    },
    {
        path: "/product",
        element: <Product />
    },
    {
        path: "/plan",
        element: <Plan />
    },
    {
        path: "/business-form/:id",
        element: <BusinessForm />
    },
    {
        path: "/business/updateStatus",
        element: <UpdateStatusCallback />
    },
];

export default Main;
