import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBox, faBriefcase, faChartLine, faCreditCard, faUser } from '@fortawesome/free-solid-svg-icons'
import "./Sidebar.scss";
import { Link, useLocation } from 'react-router-dom';

function Sidebar({role, isSidebarOpen, toggleSidebar}) {

    const location = useLocation();
    return (
        <>
            <aside className={`sidebar-container ${isSidebarOpen? "active": ""}`}>
                <FontAwesomeIcon icon={faBars} onClick={toggleSidebar} style={{ cursor: "pointer", fontWeight: "bold", fontSize: "20px" }} />
                <nav className={`sidebarlist`}>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {role==='owner' && <Link to="/dashboard" className={`sidebarNav`} >
                            <li className={`listItems ${isSidebarOpen? "": "active"} ${location.pathname === "/dashboard" ? "sidebarSelected" : ""}`}>
                                <FontAwesomeIcon icon={faChartLine} /><p className={`list-element ${isSidebarOpen? "active": ""}`}>Dashboard</p>
                            </li>
                        </Link>}

                        {role==='owner' && <Link to="/product" className={`sidebarNav`} >
                            <li className={`listItems  ${isSidebarOpen? "": "active"} ${location.pathname === "/product" ? "sidebarSelected" : ""}`}>
                            <FontAwesomeIcon icon={faBox} /><p className={`list-element ${isSidebarOpen? "active": ""}`}>Products</p>
                            </li>
                        </Link>}

                        {role==='admin' && <Link to="/user-manager" className={`sidebarNav`} >
                            <li className={`listItems ${isSidebarOpen? "": "active"} ${location.pathname === "/user-manager" ? "sidebarSelected" : ""}`}>
                                <FontAwesomeIcon icon={faUser} /><p className={`list-element ${isSidebarOpen? "active": ""}`}>User Manager</p>
                            </li>
                        </Link>}

                        {role==='admin' && <Link to="/business-manager" className={`sidebarNav`} >
                            <li className={`listItems ${isSidebarOpen? "": "active"} ${location.pathname === "/business-manager" ? "sidebarSelected" : ""}`}>
                                <FontAwesomeIcon icon={faBriefcase} /><p className={`list-element ${isSidebarOpen? "active": ""}`}>Business Manager</p>
                            </li>
                        </Link>}

                        {role==='admin' && <Link to="/payment-manager" className={`sidebarNav`} >
                            <li className={`listItems  ${isSidebarOpen? "": "active"} ${location.pathname === "/payment-manager" ? "sidebarSelected" : ""}`}>
                            <FontAwesomeIcon icon={faCreditCard} /><p className={`list-element ${isSidebarOpen? "active": ""}`}>Payment Manager</p>
                            </li>
                        </Link>}
                    </ul>
                </nav>
            </aside>
        </>
    )
}

export default Sidebar;