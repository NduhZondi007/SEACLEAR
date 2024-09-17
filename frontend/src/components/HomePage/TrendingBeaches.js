import React, { useEffect, useRef, useState } from "react";
import './TrendingBeaches.css';
import axios from 'axios'; // Import axios for making API requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const TrendingBeaches = () => {
    const sliderRef = useRef(null);
    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [velX, setVelX] = useState(0);
    const [details, setDetails] = useState([]); // State to store beach details
    const momentumID = useRef(null);
    const navigate = useNavigate(); // Hook to programmatically navigate

    // Fetch beach details from the API when component mounts
    useEffect(() => {
        axios
            .get('https://seaclear-8.cs.uct.ac.za/api/beaches') // Send a GET request to the API to retrieve beach details
            .then((res) => {
                const data = res.data; // Store the retrieved data in a variable
                setDetails(data); // Update the state with the fetched data
            })
            .catch((err) => {
                console.error('There was an error fetching the data!', err); // Log any error that occurs during the API call
            });
    }, []);

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

    // Handle beach click to navigate to a specific beach's page
    const handleBeachClick = (name) => {
        navigate(`/beach/${name}`); // Navigate to the update page for the selected beach using its name as a URL parameter
    };

    return (
        <div className="grid-container">
            <main className="grid-item main">
                <div ref={sliderRef} className="items">
                    {details.map((output, id) => (
                        <div key={id} className={`item item${id + 1}`}> {/* Use 'id' as the key for each beach element */}
                            <button onClick={() => handleBeachClick(output.name)}> {/* Button that navigates to the update page when clicked */}
                                <div>
                                    {/* Display beach name and location */}
                                    <p>Name: {output.name}</p>
                                    <p>Location: {output.location}</p>
                                    <hr /> {/* Horizontal line separator between beach details */}
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default TrendingBeaches;
