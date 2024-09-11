import React from 'react'
import videoBg from '../../assets/videos/langebaan_video.mp4'

const Hero = () => {
    return (
        <div className="hero">
            <video src={videoBg} autoPlay loop muted/>
        </div>
    )
}

export default Hero