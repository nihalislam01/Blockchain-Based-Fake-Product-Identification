import { Link } from 'react-router-dom';
import './Footer.scss'

function Footer() {
    return (
        <>
            <footer className="footer-container">
                <div className="footer-content">
                    <p className='headline'>Copyright <i class="fa-regular fa-copyright"></i> 2024 Hexis -  Your Authenticity Partner. All rights reserved</p>
                    <div className="footer-list-content">
                        <Link to="/about">About</Link>
                        <Link to="/#">Contact</Link>
                        <Link to="/press">Press</Link>
                        <Link to="/term">Terms</Link>
                        <Link to="/privacy">Privacy</Link>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;