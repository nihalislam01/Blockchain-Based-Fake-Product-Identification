import { useEffect, useRef, useState } from "react";
import handleAxiosError from "../../../common/utils/ErrorHandler";
import "./Navbar.scss";
import axios from 'axios';
import { Link, useLocation, useNavigate } from "react-router-dom";

const getUserAvatarUrl = '/api/user/getAvatar';
const logoutUrl = `/api/user/logout`;

function Navbar({isOwner}) {

    const [avatar, setAvatar] = useState("/avatar/avatar.png");
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const popupRef = useRef(null);
    const avatarRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const togglePopup = () => setIsPopupVisible(!isPopupVisible);

    useEffect(() => {
        axios.get(getUserAvatarUrl).then(response=>{
            if (response.data.success) {
                setAvatar(response.data.avatar.url)
            }
        }).catch(handleAxiosError);
        const handleClickOutside = (event) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(event.target) &&
                avatarRef.current &&
                !avatarRef.current.contains(event.target)
            ) {
                setIsPopupVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const signout = () => {
        axios.post(logoutUrl)
        .then((response) => {
            navigate('/');
        }).catch(handleAxiosError);
    }
    
    return (
        <>
            <div className={`navbar-container z-1`}>
                <div className="sub-navbar-container">
                    <h3 className="m-0">Hexis</h3>
                    <div className="nav-content">
                        <Link to="/home" className="nav-content-link" style={{fontWeight: `${location.pathname === "/home" ? "bold" : ""}`}}>Home</Link>
                        <Link to="/about" className="nav-content-link" style={{fontWeight: `${location.pathname === "/about" ? "bold" : ""}`}}>About</Link>
                        <Link to="/#" className="nav-content-link" style={{fontWeight: `${location.pathname === "/contact" ? "bold" : ""}`}}>Contact</Link>
                        <Link to="/notification" className="nav-content-link" style={{fontWeight: `${location.pathname === "/notification" ? "bold" : ""}`}}>Notifications</Link>
                    </div>
                </div>
                <div className={`avatarContainer`}>
                    <img src={avatar} alt="avatar" className={`navImg`} onClick={togglePopup} ref={avatarRef} />
                    {isPopupVisible && (
                        <div className={`popup`} ref={popupRef}>
                            <ul>
                                <a href="/profile" className={`navItems`}><li>Profile</li></a>
                                {!isOwner && <a href="/user/plan" className={`navItems`}><li>Subscription Plans</li></a>}
                                {isOwner && <a href="/business/cancel-plan" className={`navItems`}><li>Cancel Subscription</li></a>}
                                <hr className="m-1"/>
                                <li onClick={signout}>Sign Out</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Navbar;