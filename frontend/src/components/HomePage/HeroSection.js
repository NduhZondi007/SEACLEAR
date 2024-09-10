import React from 'react';
import './HeroSection.css'; // Import custom CSS if needed

const HeroSection = () => {
    return (
        <header className="masthead">
            <div className="video-container">
                <video autoPlay muted loop playsInline>
                    <source src="%PUBLIC_URL%/videos/langebaan_video.mp4" type="video/mp4" />
                    Your browser does not support HTML5 video.
                </video>
            </div>
            <div className="container px-4 px-lg-5 h-100">
                <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                    <div className="col-lg-8 align-self-end">
                        <h1 className="text-white font-weight-bold">SEACLEAR - Real-Time Water Quality Monitoring</h1>
                        <hr className="divider" />
                    </div>
                    <div className="col-lg-8 align-self-baseline">
                        <p className="text-white-75 mb-5">
                            We help you stay informed about beach water quality for safer seaside activities.
                        </p>
                        <a className="btn btn-primary btn-xl" href="#about">Find Out More</a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeroSection;
