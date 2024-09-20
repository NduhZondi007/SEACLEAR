import React, { useEffect, useRef, useState } from "react";
import './TrendingBeaches.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Import multiple beach images
import Beach1 from "./../../assets/images/Beach1.jpg";
import Beach2 from "./../../assets/images/Beach2.jpg";
import Beach3 from "./../../assets/images/Beach3.jpg"; 
import Beach4 from "./../../assets/images/Beach4.jpg";

const TrendingBeaches = ({ searchQuery }) => {
    const itemsRef = useRef(null); // Reference for the items container
    const [details, setDetails] = useState([]);
    const navigate = useNavigate();
    let isDown = false;
    let startX;
    let scrollLeft;

    // Array of beach images
    const beachImages = [Beach1, Beach2, Beach3, Beach4];

    // Function to get a random image
    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * beachImages.length);
        return beachImages[randomIndex];
    };

    useEffect(() => {
        // Fetch beach details from API
        axios.get('http://localhost:8000/beaches')
            .then((res) => setDetails(res.data))
            .catch((err) => console.error('Error fetching the data!', err));

        const items = itemsRef.current;

        // Unified event handler for both mouse and touch events
        const handleMoveStart = (e) => {
            isDown = true;
            items.classList.add('active');
            startX = (e.pageX || e.touches[0].pageX) - items.offsetLeft;
            scrollLeft = items.scrollLeft;
        };

        const handleMoveEnd = () => {
            isDown = false;
            items.classList.remove('active');
        };

        const handleMove = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = (e.pageX || e.touches[0].pageX) - items.offsetLeft;
            const walk = (startX - x) * 3; // Scroll right to left
            items.scrollLeft = scrollLeft + walk;
        };

        // Add event listeners for both mouse and touch events
        items.addEventListener('mousedown', handleMoveStart);
        items.addEventListener('mouseup', handleMoveEnd);
        items.addEventListener('mousemove', handleMove);
        items.addEventListener('mouseleave', handleMoveEnd);
        items.addEventListener('touchstart', handleMoveStart);
        items.addEventListener('touchend', handleMoveEnd);
        items.addEventListener('touchmove', handleMove);

        // Clean up event listeners on component unmount
        return () => {
            items.removeEventListener('mousedown', handleMoveStart);
            items.removeEventListener('mouseup', handleMoveEnd);
            items.removeEventListener('mousemove', handleMove);
            items.removeEventListener('mouseleave', handleMoveEnd);
            items.removeEventListener('touchstart', handleMoveStart);
            items.removeEventListener('touchend', handleMoveEnd);
            items.removeEventListener('touchmove', handleMove);
        };
    }, []);

    // Filter beaches based on search query
    const filteredBeaches = details.filter(beach =>
        beach.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="grid-container no-highlight">
            <div ref={itemsRef} className="items">
                {filteredBeaches.map((beach, id) => (
                    <div key={id} className="item">
                        {/* Random beach image */}
                        <img src={getRandomImage()} alt="BeachImage" />
                        <p>{beach.name}</p>
                        
                        {/* Beach Safety Details */}
                        <p className="beach-safety">
                            {beach.waterQuality.isSafe === "Safe" ? (
                                <span className="safe">Safe to swim 🟢</span>
                            ) : beach.waterQuality.isSafe === "medium" ? (
                                <span className="partially-safe">Partially Safe to swim 🟡</span>
                            ) : (
                                <span className="unsafe">Unsafe to Swim 🔴</span>
                            )}
                        </p>

                        <button onClick={() => navigate(`/beach/${beach.name}`)}>
                            Explore {beach.name}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrendingBeaches;
