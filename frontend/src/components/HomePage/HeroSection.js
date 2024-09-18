import React from 'react';
import './HeroSection.css'; // Import custom CSS if needed

const HeroSection = () => {
    return (
        <header className="masthead">
            <div className="video-container">
                <video id="HeroVideo" autoPlay muted loop>
                    <source src="/videos/langebaan_video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="container">
                <div className="">
                    <h1 className="text-header"> Real-Time Water Quality Monitoring</h1>
                    <hr className="divider" />
                    <p className='hero-text'>We help you stay informed about beach water quality for safer seaside activities.</p>
                    <button className="btn btn-primary btn-xl" onClick={() => window.location.href = '/Map'}>Explore Map</button>
                </div>
            </div>
        </header>
    );
};

export default HeroSection;
