import React from 'react';
import './HeroSection.css';


const HeroSection = () => {
    return (
        <header className="masthead">
            {/* Video Background */}
            <video className="background-video" autoPlay muted loop>
                <source src="/videos/langebaan_video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Hero section content */}
            <div className="container px-4 px-lg-5 h-100">
                <div className="text-center">
                    <h1 > Real-Time Water Quality Monitoring</h1>
                    <hr className="divider" />
                    <p className="mb-5">We help you stay informed about beach water quality for safer seaside activities.</p>

                    <button className="btn-primary" onClick={() => window.location.href = '#about'}>Find Out More</button>
                    
                </div>
            </div>
        </header>
    );
};

export default HeroSection;
