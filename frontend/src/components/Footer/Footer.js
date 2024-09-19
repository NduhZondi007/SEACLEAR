import React from 'react';
import './Footer.css';  // Import the new CSS file
import '../Navbar/Navbar.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <footer-content>
                <Link className="navbar-brand" to="/">
                    <img src="/images/seaclearlogo.png" alt="SeaClear Logo" />
                    SEACLEAR
                </Link>
                <p className='footer-text subphrase'>Providing real-time water quality information for local beaches in Cape Town.</p>
                <p className="footer-text">Powered by data from the City of Cape Town.</p>

            </footer-content>
            
            <p className="footer-text">© 2024 SeaClear. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
