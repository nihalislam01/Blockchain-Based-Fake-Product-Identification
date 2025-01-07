import React from "react";
import Landing, { landingRoutes } from "../component/Landing/Landing/Landing";
import AuthenticatedRoute from "../common/utils/AuthenticatedRoute";
import Authenticated, { authenticatedRoutes } from "../component/Authenticated/Authenticated/Authenticated";
import Message from "../common/components/Message/Message";
import WhatAreWe, { whatAreWeRoutes } from "../component/WhatAreWe/WhatAreWe";
import DontHavePass from "../component/DontHavePass/DontHavePass";

export const routes = [
    {
        path: "/",
        element: <Landing />,
        children: landingRoutes,
    },
    {
        path: "/",
        element: <WhatAreWe />,
        children: whatAreWeRoutes,
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
    {
        path: "/account-disabled",
        element: <DontHavePass />,
    },
    {
        path: "/*",
        element: <div className="d-flex flex-column justify-content-center align-items-center w-100 min-vh-100"><Message headline="Error" message="404 Not Found" /></div>,
    },
];