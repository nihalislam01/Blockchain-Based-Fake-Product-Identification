import React from "react";
import Landing, { landingRoutes } from "../component/Landing/Landing/Landing";
import AuthenticatedRoute from "../common/utils/AuthenticatedRoute";
import Authenticated, { authenticatedRoutes } from "../component/Authenticated/Authenticated/Authenticated";

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
                <Authenticated />
            </AuthenticatedRoute>
        ),
        children: authenticatedRoutes
    },
];