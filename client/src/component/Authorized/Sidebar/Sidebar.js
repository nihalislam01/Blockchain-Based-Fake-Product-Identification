import "./Sidebar.scss";
import { Link, useLocation } from 'react-router-dom';

function Sidebar({role, isSidebarOpen, toggleSidebar}) {

    const location = useLocation();
    return (
        <>
            <aside className={`sidebar-container ${isSidebarOpen? "active": ""}`}>
                <i class="fa-solid fa-bars" onClick={toggleSidebar} style={{ cursor: "pointer", fontWeight: "bold", fontSize: "20px" }}></i>
                <nav className={`sidebarlist`}>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {role==='owner' && <Link to="/business/dashboard" className={`sidebarNav`} >
                            <li className={`listItems ${isSidebarOpen? "": "active"} ${location.pathname === "/business/dashboard" ? "sidebarSelected" : ""}`}>
                            <i className="fa-solid fa-chart-line"></i><p className={`list-element ${isSidebarOpen? "active": ""}`}>Dashboard</p>
                            </li>
                        </Link>}

                        {role==='owner' && <Link to="/business/product" className={`sidebarNav`} >
                            <li className={`listItems  ${isSidebarOpen? "": "active"} ${location.pathname === "/business/product" ? "sidebarSelected" : ""}`}>
                            <i className="fa-solid fa-box"></i><p className={`list-element ${isSidebarOpen? "active": ""}`}>Products</p>
                            </li>
                        </Link>}

                        {role==='owner' && <Link to="/business/calendar" className={`sidebarNav`} >
                            <li className={`listItems  ${isSidebarOpen? "": "active"} ${location.pathname === "/business/calendar" ? "sidebarSelected" : ""}`}>
                            <i className="fa-regular fa-calendar"></i><p className={`list-element ${isSidebarOpen? "active": ""}`}>Calendar</p>
                            </li>
                        </Link>}

                        {role==='owner' && <Link to="/business/rule-book" className={`sidebarNav`} >
                            <li className={`listItems  ${isSidebarOpen? "": "active"} ${location.pathname === "/business/rule-book" ? "sidebarSelected" : ""}`}>
                            <i className="fa-solid fa-book"></i><p className={`list-element ${isSidebarOpen? "active": ""}`}>Rule Book</p>
                            </li>
                        </Link>}

                        {role==='admin' && <Link to="/admin/user-manager" className={`sidebarNav`} >
                            <li className={`listItems ${isSidebarOpen? "": "active"} ${location.pathname === "/admin/user-manager" ? "sidebarSelected" : ""}`}>
                                <i className="fa-solid fa-user" style={{marginRight: "1px", marginLeft: "1px"}}></i><p className={`list-element ${isSidebarOpen? "active": ""}`}>User Manager</p>
                            </li>
                        </Link>}

                        {role==='admin' && <Link to="/admin/business-manager" className={`sidebarNav`} >
                            <li className={`listItems ${isSidebarOpen? "": "active"} ${location.pathname === "/admin/business-manager" ? "sidebarSelected" : ""}`}>
                            <i className="fa-solid fa-briefcase"></i><p className={`list-element ${isSidebarOpen? "active": ""}`}>Business Manager</p>
                            </li>
                        </Link>}

                        {role==='admin' && <Link to="/admin/payment-manager" className={`sidebarNav`} >
                            <li className={`listItems  ${isSidebarOpen? "": "active"} ${location.pathname === "/admin/payment-manager" ? "sidebarSelected" : ""}`}>
                            <i className="fa-solid fa-credit-card"></i><p className={`list-element ${isSidebarOpen? "active": ""}`}>Payment Manager</p>
                            </li>
                        </Link>}
                    </ul>
                </nav>
            </aside>
        </>
    )
}

export default Sidebar;