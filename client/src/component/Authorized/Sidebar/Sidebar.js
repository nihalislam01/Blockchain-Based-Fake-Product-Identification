import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBox, faBriefcase, faChartLine, faCreditCard, faUser } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
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
                        {role==='owner' && <Link to="/business/dashboard" className={`sidebarNav`} >
                            <li className={`listItems ${isSidebarOpen? "": "active"} ${location.pathname === "/business/dashboard" ? "sidebarSelected" : ""}`}>
                                <FontAwesomeIcon icon={faChartLine} /><p className={`list-element ${isSidebarOpen? "active": ""}`}>Dashboard</p>
                            </li>
                        </Link>}

                        {role==='owner' && <Link to="/business/product" className={`sidebarNav`} >
                            <li className={`listItems  ${isSidebarOpen? "": "active"} ${location.pathname === "/business/product" ? "sidebarSelected" : ""}`}>
                            <FontAwesomeIcon icon={faBox} /><p className={`list-element ${isSidebarOpen? "active": ""}`}>Products</p>
                            </li>
                        </Link>}

                        {role==='owner' && <Link to="/business/calendar" className={`sidebarNav`} >
                            <li className={`listItems  ${isSidebarOpen? "": "active"} ${location.pathname === "/business/calendar" ? "sidebarSelected" : ""}`}>
                            <FontAwesomeIcon icon={faCalendar} /><p className={`list-element ${isSidebarOpen? "active": ""}`}>Calendar</p>
                            </li>
                        </Link>}

                        {role==='admin' && <Link to="/admin/user-manager" className={`sidebarNav`} >
                            <li className={`listItems ${isSidebarOpen? "": "active"} ${location.pathname === "/admin/user-manager" ? "sidebarSelected" : ""}`}>
                                <FontAwesomeIcon icon={faUser} /><p className={`list-element ${isSidebarOpen? "active": ""}`}>User Manager</p>
                            </li>
                        </Link>}

                        {role==='admin' && <Link to="/admin/business-manager" className={`sidebarNav`} >
                            <li className={`listItems ${isSidebarOpen? "": "active"} ${location.pathname === "/admin/business-manager" ? "sidebarSelected" : ""}`}>
                                <FontAwesomeIcon icon={faBriefcase} /><p className={`list-element ${isSidebarOpen? "active": ""}`}>Business Manager</p>
                            </li>
                        </Link>}

                        {role==='admin' && <Link to="/admin/payment-manager" className={`sidebarNav`} >
                            <li className={`listItems  ${isSidebarOpen? "": "active"} ${location.pathname === "/admin/payment-manager" ? "sidebarSelected" : ""}`}>
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