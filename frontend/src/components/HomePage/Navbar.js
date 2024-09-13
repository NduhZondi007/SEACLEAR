import React from 'react';
import './Navbar.css'; // Import custom CSS if needed

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
            <div className="container">
                <a className="navbar-brand" href="#page-top">
                    <img src="/images/seaclearlogo.png" alt="SeaClear Logo" />
                    SEACLEAR
                </a>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
                        <li className="nav-item"><a className="nav-link" href="#services">Beach Finder</a></li>
                        <li className="nav-item"><a className="nav-link" href="#portfolio">Forum</a></li>
                        <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
