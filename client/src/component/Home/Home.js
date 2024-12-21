import { faCircleDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet } from "react-router-dom";
import CommonHelmet from "../../common/components/Head/CommonHelmet";
import VerifyProduct from "../VerifyProduct/VerifyProduct";
import "./Home.scss";

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

    return (
        <>
            <CommonHelmet title={pageTitle} />
            <div className="container d-flex" style={{width: "100%", minHeight: "80vh"}}>
                <div className="d-flex flex-column justify-content-center w-50">
                    <h3>Hexis - Your Authenticity Partner</h3>
                    {keyPoints.map(point=>(
                        <div className="d-flex align-items-center gap-2" key={point}>
                            <FontAwesomeIcon icon={faCircleDot} />
                            <p className="m-0">{point}</p>
                        </div>
                    ))}
                </div>
                <div className="d-flex justify-content-center align-items-center w-50">
                    <Outlet />
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
]

export default Home;