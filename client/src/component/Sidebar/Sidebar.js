import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import "./Sidebar.scss";
import { Link, useLocation } from 'react-router-dom';

function Sidebar({isSidebarOpen, toggleSidebar}) {

    const location = useLocation();
    return (
        <>
            <aside className={`sidebarContainer`} style={{ transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)"}}>
                <FontAwesomeIcon icon={faBars} size="2x" onClick={toggleSidebar} style={{ cursor: "pointer" }} />
                <nav className={`sidebarlist`}>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        <Link to="/dashboard" className={`sidebarNav`} >
                            <li className={`listItems ${location.pathname === "/dashboard" ? "sidebarSelected" : ""}`}>
                                Dashboard
                            </li>
                        </Link>

                        <Link to="/product" className={`sidebarNav`} >
                            <li className={`listItems ${location.pathname === "/product" ? "sidebarSelected" : ""}`}>
                                Products
                            </li>
                        </Link>
                    </ul>
                </nav>
            </aside>
        </>
    )
}

export default Sidebar;