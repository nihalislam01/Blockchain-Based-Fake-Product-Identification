import './Navbar.scss';
import { Link, useLocation } from "react-router-dom";

function Navbar() {

    const location = useLocation();

    return (
        <>
            <div className="navbar-container-unauth">
                <Link to="/" style={{cursor: "pointer", textDecoration: "none"}}><h2>Hexis</h2></Link>
                <div className="sign-container">
                    <Link to="/login"><button className={`sign-button ${location.pathname === "/login" ? "selected left-selected" : ""}`}>Sign In</button></Link>
                    <Link to="/signup"><button className={`sign-button ${location.pathname === "/signup" ? "selected right-selected" : ""}`}>Sign Up</button></Link>
                </div>
            </div>
        </>
    )
}

export default Navbar;