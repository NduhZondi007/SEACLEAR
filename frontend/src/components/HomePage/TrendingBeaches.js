import React, { useEffect, useRef, useState } from "react";
import './TrendingBeaches.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Beach1 from "./../../assets/images/Beach1.jpg"; // Example beach image

const TrendingBeaches = ({ searchQuery }) => {
    const itemsRef = useRef(null); // Reference for the items container
    const [details, setDetails] = useState([]);
    const navigate = useNavigate();
    let isDown = false;
    let startX;
    let scrollLeft;

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
                        <img src={Beach1} alt="BeachImage" />
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
