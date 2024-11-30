import React from "react";
import Landing, { landingRoutes } from "../component/Landing/Landing/Landing";

export const routes = [
    {
        path: "/",
        element: <Landing />,
        children: landingRoutes,
    }
];