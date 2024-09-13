import React, { useEffect, useRef, useState } from "react";
import './TrendingBeaches.css';

const TrendingBeaches = () => {
    const sliderRef = useRef(null);
    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [velX, setVelX] = useState(0);
    const momentumID = useRef(null);

    useEffect(() => {
        const slider = sliderRef.current;

        const handleMouseDown = (e) => {
            setIsDown(true);
            slider.classList.add('active');
            setStartX(e.pageX - slider.offsetLeft);
            setScrollLeft(slider.scrollLeft);
            cancelMomentumTracking();
        };

        const handleMouseLeave = () => {
            setIsDown(false);
            slider.classList.remove('active');
        };

        const handleMouseUp = () => {
            setIsDown(false);
            slider.classList.remove('active');
            beginMomentumTracking();
        };

        const handleMouseMove = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 3; //scroll-fast
            const prevScrollLeft = slider.scrollLeft;
            slider.scrollLeft = scrollLeft - walk;
            setVelX(slider.scrollLeft - prevScrollLeft);
        };

        const handleWheel = () => {
            cancelMomentumTracking();
        };

        const beginMomentumTracking = () => {
            cancelMomentumTracking();
            momentumID.current = requestAnimationFrame(momentumLoop);
        };

        const cancelMomentumTracking = () => {
            cancelAnimationFrame(momentumID.current);
        };

        const momentumLoop = () => {
            slider.scrollLeft += velX;
            setVelX((prevVelX) => prevVelX * 0.95);
            if (Math.abs(velX) > 0.5) {
                momentumID.current = requestAnimationFrame(momentumLoop);
            }
        };

        // Event listeners
        slider.addEventListener('mousedown', handleMouseDown);
        slider.addEventListener('mouseleave', handleMouseLeave);
        slider.addEventListener('mouseup', handleMouseUp);
        slider.addEventListener('mousemove', handleMouseMove);
        slider.addEventListener('wheel', handleWheel);

        return () => {
            slider.removeEventListener('mousedown', handleMouseDown);
            slider.removeEventListener('mouseleave', handleMouseLeave);
            slider.removeEventListener('mouseup', handleMouseUp);
            slider.removeEventListener('mousemove', handleMouseMove);
            slider.removeEventListener('wheel', handleWheel);
            cancelMomentumTracking();
        };
    }, [isDown, startX, scrollLeft, velX]);

    return (
        <div className="grid-container">
            <main className="grid-item main">
                <div ref={sliderRef} className="items">
                    {[...Array(10).keys()].map((i) => (
                        <div key={i} className={`item item${i + 1}`}></div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default TrendingBeaches;
