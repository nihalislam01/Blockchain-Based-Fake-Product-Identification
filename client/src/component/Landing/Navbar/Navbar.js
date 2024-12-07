import './Navbar.scss';
import { Link, useLocation } from "react-router-dom";

function Navbar() {

    const location = useLocation();

    return (
        <>
            <div className="navbar-container">
                <h2>Hexis</h2>
                <div className="sign-container">
                    <Link to="/"><button className={`sign-button ${location.pathname === "/" ? "selected left-selected" : ""}`}>Sign In</button></Link>
                    <Link to="/signup"><button className={`sign-button ${location.pathname === "/signup" ? "selected right-selected" : ""}`}>Sign Up</button></Link>
                </div>
            </div>
        </>
    )
}

export default Navbar;