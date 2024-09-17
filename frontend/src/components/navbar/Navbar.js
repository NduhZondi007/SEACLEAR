import React, { useState } from 'react';
import './Navbar.css'; // Import custom CSS if needed
import { IoClose, IoMenu } from "react-icons/io5";
<<<<<<< HEAD:frontend/src/components/Navbar.js
import { Link } from 'react-router-dom';
=======
import LoginIcon from '../AdminPage/LoginIcon';

>>>>>>> 0b76e0e5b38944688a32512c4938ecfa6d6fa9cf:frontend/src/components/navbar/Navbar.js

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={`navbar navbar-expand-lg navbar-light fixed-top py-3 ${isMenuOpen ? 'blur-background' : ''}`} id="mainNav">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img src="/images/seaclearlogo.png" alt="SeaClear Logo" />
                    SEACLEAR
                </Link>

                <div className={`navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarResponsive">
                    <ul className="navbar-nav">
                        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="#About">About</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/Map">Beach Finder</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="#contact">Submit Report</Link></li>
                    </ul>
                </div>

                <button className="mobile-menu-icon" onClick={toggleMenu}>
                    {isMenuOpen ? <IoClose size={28} color="white" /> : <IoMenu size={28} color="white" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="mobile-menu">
                    <ul className="mobile-nav-links">
                        <li className="mobile-nav-item"><a href="#about" onClick={toggleMenu}>About</a></li>
                        <li className="mobile-nav-item"><a href="#services" onClick={toggleMenu}>Beach Finder</a></li>
                        <li className="mobile-nav-item"><a href="#portfolio" onClick={toggleMenu}>Forum</a></li>
                        <li className="mobile-nav-item"><a href="#contact" onClick={toggleMenu}>Contact</a></li>
                    </ul>
                </div>
            )}
            <LoginIcon/>
        </nav>
    );
};

export default Navbar;
