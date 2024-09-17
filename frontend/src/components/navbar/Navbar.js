import React, { useState } from 'react';
import './Navbar.css'; // Import custom CSS if needed
import { IoClose, IoMenu } from "react-icons/io5";
import LoginIcon from '../AdminPage/LoginIcon';


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={`navbar navbar-expand-lg navbar-light fixed-top py-3 ${isMenuOpen ? 'blur-background' : ''}`} id="mainNav">
            <div className="container">
                <a className="navbar-brand" href="/">
                    <img src="/images/seaclearlogo.png" alt="SeaClear Logo" />
                    SEACLEAR
                </a>
                
                <div className={`navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarResponsive">
                    <ul className="navbar-nav">
                        <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
                        <li className="nav-item"><a className="nav-link" href="#services">Beach Finder</a></li>
                        <li className="nav-item"><a className="nav-link" href="#portfolio">Forum</a></li>
                        <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
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
