import React from "react";
import Landing, { landingRoutes } from "../component/Landing/Landing/Landing";
import PrivateRoute from "../common/utils/PrivateRoute";
import Main, { authenticatedRoutes } from "../component/Main/Main";

export const routes = [
    {
        path: "/",
        element: <Landing />,
        children: landingRoutes,
    },
    {
        path: "/",
        element: ( 
            <PrivateRoute>
                <Main />
            </PrivateRoute>
        ),
        children: authenticatedRoutes
    },
];