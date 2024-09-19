import React, { useEffect, useRef, useState } from "react";
import './TrendingBeaches.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TrendingBeaches = ({ searchQuery }) => {
    const itemsRef = useRef(null); // Reference for the items container
    const [details, setDetails] = useState([]);
    const navigate = useNavigate();

    // Variables for dragging
    let isDown = false;
    let startX;
    let scrollLeft;

    useEffect(() => {
        // Fetch beach details from API
        axios.get('http://localhost:8000/beaches')
            .then((res) => {
                setDetails(res.data);
            })
            .catch((err) => {
                console.error('Error fetching the data!', err);
            });

        const items = itemsRef.current;

        // Mouse event handlers
        const handleMouseDown = (e) => {
            isDown = true;
            items.classList.add('active');
            startX = e.pageX - items.offsetLeft;
            scrollLeft = items.scrollLeft;
        };

        const handleMouseLeave = () => {
            isDown = false;
            items.classList.remove('active');
        };

        const handleMouseUp = () => {
            isDown = false;
            items.classList.remove('active');
        };

        const handleMouseMove = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - items.offsetLeft;
            const walk = (startX - x) * 3; // Scroll right to left
            items.scrollLeft = scrollLeft + walk;
        };

        // Touch event handlers for mobile devices
        const handleTouchStart = (e) => {
            isDown = true;
            items.classList.add('active');
            startX = e.touches[0].pageX - items.offsetLeft;
            scrollLeft = items.scrollLeft;
        };

        const handleTouchEnd = () => {
            isDown = false;
            items.classList.remove('active');
        };

        const handleTouchMove = (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - items.offsetLeft;
            const walk = (startX - x) * 3; // Scroll right to left
            items.scrollLeft = scrollLeft + walk;
        };

        // Adding mouse event listeners
        items.addEventListener('mousedown', handleMouseDown);
        items.addEventListener('mouseleave', handleMouseLeave);
        items.addEventListener('mouseup', handleMouseUp);
        items.addEventListener('mousemove', handleMouseMove);

        // Adding touch event listeners
        items.addEventListener('touchstart', handleTouchStart);
        items.addEventListener('touchend', handleTouchEnd);
        items.addEventListener('touchmove', handleTouchMove);

        // Clean up the event listeners on component unmount
        return () => {
            items.removeEventListener('mousedown', handleMouseDown);
            items.removeEventListener('mouseleave', handleMouseLeave);
            items.removeEventListener('mouseup', handleMouseUp);
            items.removeEventListener('mousemove', handleMouseMove);

            items.removeEventListener('touchstart', handleTouchStart);
            items.removeEventListener('touchend', handleTouchEnd);
            items.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    const filteredBeaches = details.filter(beach =>
        beach.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="grid-container">
            <div
                ref={itemsRef} // Assign the ref to the items container
                className="items"
            >
                {filteredBeaches.map((beach, id) => (
                    <div key={id} className="item">
                        
                        <p>{beach.name}</p>
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
