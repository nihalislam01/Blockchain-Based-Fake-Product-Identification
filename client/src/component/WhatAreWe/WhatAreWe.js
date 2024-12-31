import { Route, Routes } from "react-router-dom";
import About from "./About";
import Press from "./Press";
import Term from "./Term";
import Privacy from "./Privacy";
import Landing from "../Landing/Landing/Landing";
import Authenticated from "../Authenticated/Authenticated/Authenticated";
import AuthenticatedRoute from "../../common/utils/AuthenticatedRoute";

export const whatAreWeRoutes = [
    {
        path: "/about",
        element: <About />
    },
    {
        path: "/press",
        element: <Press />
    },
    {
        path: "/term",
        element: <Term />
    },
    {
        path: "/privacy",
        element: <Privacy />
    },
]

const WhatAreWe = () => {
    return (
        <AuthenticatedRoute redirect={<Landing />}>
            <Authenticated>
                <Routes>
                    {whatAreWeRoutes.map((route, index) => (
                        <Route key={index} path={route.path} element={route.element} />
                    ))}
                </Routes>
            </Authenticated>
        </AuthenticatedRoute>
    );
}

export default WhatAreWe;