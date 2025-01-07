import { Outlet } from "react-router-dom";
import CommonHelmet from "../../../../common/components/Head/CommonHelmet";
import VerifyProduct from "../VerifyProduct/VerifyProduct";
import "./Home.scss";
import { useState } from "react";
import { AlertProvider } from "../../../../common/utils/AletContext";
import OwnerAuthorized, { businessHomeRoutes } from "../../../Authorized/OwnerAuthorized/OwnerAuthorized/OwnerAuthorized";
import AuthorizedRoute from "../../../../common/utils/AuthorizedRoute";

const pageTitle = "Hexis - Home";

const keyPoints = [
    "Authenticate products using blockchain technology for tamper-proof records.",
    "Store product information securely on the blockchain, ensuring it cannot be altered or forged.",
    "Offer a simple and intuitive platform for seamless interaction.",
    "Allow businesses to upload and register product details securely through the app.",
    "Build consumer confidence by showcasing the product's origin and authenticity.",
    "Allow businesses to personalize verification experiences with their brand elements."
]
function Home() {

    const [alert, setAlert] = useState({
        show: false,
        head: "",
        message: "",
        type: ""
    })

    const onClose = () => {
        setAlert({show: false, message: "", type: "", head: ""});
    }

    return (
        <>
            <CommonHelmet title={pageTitle} />
            {alert.show && <div className={`alert alert-${alert.type} d-flex justify-content-between align-items-center w-100`}>
                <p className="m-0"><strong>{alert.head}</strong> {alert.message}</p>
                <i className="fa-solid fa-xmark m-0" style={{cursor: "pointer"}} onClick={onClose}></i>
            </div>}
            <div className="d-flex w-100">
                <div className="d-flex flex-column justify-content-center w-50">
                    <h3>Hexis - Your Authenticity Partner</h3>
                    {keyPoints.map(point=>(
                        <div className="d-flex align-items-center gap-2" key={point}>
                            <i className="fa-solid fa-circle-dot"></i>
                            <p className="m-0">{point}</p>
                        </div>
                    ))}
                </div>
                <div className="d-flex justify-content-center align-items-center w-50">
                    <div className="border text-center" style={{padding: "20px", borderRadius: "10px", backgroundColor: "white", width: "70%"}}>
                        <AlertProvider setAlert={setAlert}>
                                <Outlet />
                            </AlertProvider>
                        </div>
                    </div>
            </div>
        </>
    )
}

export const homePages = [
    {
        path: "/home",
        element: <VerifyProduct />
    },
    {
        path: "/business",
        element: <AuthorizedRoute roles={["owner"]}><OwnerAuthorized /></AuthorizedRoute>,
        children: businessHomeRoutes
    },
]

export const unAuthenticatedHomePages = [
    {
        path: "/",
        element: <VerifyProduct />
    },
]

export default Home;