import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBox, faChartLine } from '@fortawesome/free-solid-svg-icons'
import "./Sidebar.scss";
import { Link, useLocation } from 'react-router-dom';

function Sidebar({isSidebarOpen, toggleSidebar}) {

    const location = useLocation();
    return (
        <>
            <aside className={`sidebar-container ${isSidebarOpen? "active": ""}`}>
                <FontAwesomeIcon icon={faBars} onClick={toggleSidebar} style={{ cursor: "pointer", fontWeight: "bold", fontSize: "20px" }} />
                <nav className={`sidebarlist`}>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        <Link to="/dashboard" className={`sidebarNav`} >
                            <li className={`listItems ${isSidebarOpen? "": "active"} ${location.pathname === "/dashboard" ? "sidebarSelected" : ""}`}>
                                <FontAwesomeIcon icon={faChartLine} /><p className={`list-element ${isSidebarOpen? "active": ""}`}>Dashboard</p>
                            </li>
                        </Link>

                        <Link to="/product" className={`sidebarNav`} >
                            <li className={`listItems  ${isSidebarOpen? "": "active"} ${location.pathname === "/product" ? "sidebarSelected" : ""}`}>
                            <FontAwesomeIcon icon={faBox} /><p className={`list-element ${isSidebarOpen? "active": ""}`}>Products</p>
                            </li>
                        </Link>
                    </ul>
                </nav>
            </aside>
        </>
    )
}

export default Sidebar;