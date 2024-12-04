import React from "react";
import Landing, { landingRoutes } from "../component/Landing/Landing/Landing";
import Profile from "../component/Profile/Profile";
import PrivateRoute from "../common/utils/PrivateRoute";

export const routes = [
    {
        path: "/",
        element: <Landing />,
        children: landingRoutes,
    },
    {
        path: "/profile",
        element: ( 
            <PrivateRoute>
                <Profile />
            </PrivateRoute>
        )
    }
];