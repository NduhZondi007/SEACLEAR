import React from 'react';
import './Footer.css';  // Import the new CSS file
import '../Navbar/Navbar.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
<<<<<<< HEAD
        <footer style={footerStyle}>
            <p><strong>SeaClear Project</strong> | Providing real-time water quality information for local beaches in Cape Town.</p>
            <p>Powered by data from the City of Cape Town.</p>
            <p>© 2024 SeaClear. All rights reserved.</p>
=======
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
>>>>>>> eb5f03e32e28e369370d6424ef6c1273f4a7ac56
        </footer>
    );
};

export default Footer;
