import React, { useState } from 'react';
import './Navbar.css'; // Import custom CSS if needed
import { IoClose, IoMenu } from "react-icons/io5";
import { Link } from 'react-router-dom';


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>

            <nav className={`navbar navbar-expand-lg navbar-light fixed-top py-3 ${isMenuOpen ? 'blur-background' : ''}`} id="mainNav">

                <div className="container" id='nav'>

                    <Link className="navbar-brand" to="/">
                        <img src="/images/seaclearlogo.png" alt="SeaClear Logo" />
                        SEACLEAR
                    </Link>

                    <div className={`navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarResponsive">
                        <ul className="navbar-nav">
                            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/Map">Map</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/WriteReport">Submit Report</Link></li>
                            <button className="nav-btn btn-primary btn-xl nav-item " onClick={() => window.location.href = '/adminpageLogin/'}>Login</button>
                        </ul>
                    </div>

                    <button className="mobile-menu-icon nav-item" onClick={toggleMenu}>
                        <div className={`hamburger ${isMenuOpen ? "open" : ""}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>


                </div>

                <button className="mobile-menu-icon nav-item" onClick={toggleMenu}>
                        <div className={`hamburger ${isMenuOpen ? "open" : ""}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                </button>

                <div className='nav-container'>
                    <Link className="navbar-brand" to="/">
                        <img src="/images/seaclearlogo.png" alt="SeaClear Logo" />
                        SEACLEAR
                    </Link>
                    {/* Mobile Menu Overlay */}
                    {isMenuOpen && (
                        <div className="mobile-menu mobile-nav">
                            <button className="mobile-menu-icon active nav-link " onClick={toggleMenu}>
                                {isMenuOpen ? <IoClose size={32} color="white" /> : <IoMenu size={32} color="white" />}
                            </button>
                            <ul className="mobile-nav-links">
                                <li className="mobile-nav-item"><Link className="nav-link" to="/">Home</Link></li>
                                <li className="mobile-nav-item"><Link className="nav-link" to="/Map">Map</Link></li>
                                <li className="mobile-nav-item"><Link className="nav-link" to="/WriteReport">Submit Report</Link></li>
                                <button className="nav-btn btn-xl nav-item " onClick={() => window.location.href = '/adminpageLogin/'}>Login</button>
                            </ul>
                        </div>

                    )}
                </div>
            </nav>
        </>
    );
};

export default Navbar;
