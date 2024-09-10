import React from 'react';  // Importing React to create the component
import videoBg from '../../assets/videos/langebaan_video.mp4';  // Importing the video file to be used as the background

// Functional component Hero
const Hero = () => {
    return (
        <div className="hero">
            {/* Video element that uses the imported video file as the source */}
            {/* autoPlay: plays the video automatically when loaded */}
            {/* loop: ensures the video plays in a loop continuously */}
            {/* muted: mutes the video to avoid sound */}
            <video src={videoBg} autoPlay loop muted />
        </div>
    );
};

export default Hero;  // Exporting the component to be used in other parts of the app
