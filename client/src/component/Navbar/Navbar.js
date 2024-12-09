import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import handleAxiosError from "../../common/utils/ErrorHandler";
import "./Navbar.scss";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const getUserAvatarUrl = '/api/user/getAvatar';
const logoutUrl = `/api/user/logout`;

function Navbar({isOwner, toggleSidebar, isSidebarOpen}) {

    const [avatar, setAvatar] = useState("/avatar/avatar.png");
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const popupRef = useRef(null);
    const avatarRef = useRef(null);
    const navigate = useNavigate();

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
                {isOwner && <FontAwesomeIcon icon={faBars} size="2x" onClick={toggleSidebar} className={`sidebarIcon`} style={{ display: isSidebarOpen ? "none" : "block" }} />}
                <div className="sub-navbar-container">
                    <h3 className="m-0">Hexis</h3>
                    <div className="nav-content">
                        <Link to="/home" className="nav-content-link">Home</Link>
                        <Link to="/#" className="nav-content-link">About</Link>
                        <Link to="/#" className="nav-content-link">Contact</Link>
                        <Link to="/#" className="nav-content-link">Notifications</Link>
                    </div>
                </div>
                <div className={`avatarContainer`}>
                    <img src={avatar} alt="avatar" className={`navImg`} onClick={togglePopup} ref={avatarRef} />
                    {isPopupVisible && (
                        <div className={`popup`} ref={popupRef}>
                            <ul>
                                <Link to="/profile" className={`navItems`}><li>Profile</li></Link>
                                {!isOwner && <Link to="/plan" className={`navItems`}><li>Subscription Plans</li></Link>}
                                {isOwner && <Link to="/cancel-plan" className={`navItems`}><li>Cancel Subscription</li></Link>}
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