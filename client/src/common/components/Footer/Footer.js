import './Footer.scss'

function Footer() {
    return (
        <>
            <footer className="footer-container">
                <div className="footer-content">
                    <p className='headline'>Copyright <i class="fa-solid fa-copyright"></i> 2024 Hexis -  Your Authenticity Partner. All rights reserved</p>
                    <div className="footer-list-content">
                        <a href="/#">About</a>
                        <a href="/#">Contact</a>
                        <a href="/#">Press</a>
                        <a href="/#">Terms</a>
                        <a href="/#">Privacy</a>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;