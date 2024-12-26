import React from "react";
import Landing, { landingRoutes } from "../component/Landing/Landing/Landing";
import AuthenticatedRoute from "../common/utils/AuthenticatedRoute";
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
            <AuthenticatedRoute>
                <Main />
            </AuthenticatedRoute>
        ),
        children: authenticatedRoutes
    },
];