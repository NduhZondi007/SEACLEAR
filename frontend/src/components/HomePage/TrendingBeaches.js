import React, { useEffect, useRef, useState } from "react";
import './TrendingBeaches.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TrendingBeaches = ({ searchQuery }) => {
    const sliderRef = useRef(null);
    const [details, setDetails] = useState([]);
    const navigate = useNavigate();

    // Variables for dragging
    let isDown = false;
    let startX;
    let scrollLeft;

    useEffect(() => {
        axios
            .get('https://seaclear-8.cs.uct.ac.za/api/beaches') // Send a GET request to the API to retrieve beach details
            .then((res) => {
                setDetails(res.data);
            })
            .catch((err) => {
                console.error('Error fetching the data!', err);
            });
    }, []);

    const filteredBeaches = details.filter(beach =>
        beach.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Event handlers for dragging
    const handleMouseDown = (e) => {
        isDown = true;
        sliderRef.current.classList.add('active');
        startX = e.pageX - sliderRef.current.offsetLeft;
        scrollLeft = sliderRef.current.scrollLeft;
    };

    const handleMouseLeave = () => {
        isDown = false;
        sliderRef.current.classList.remove('active');
    };

    const handleMouseUp = () => {
        isDown = false;
        sliderRef.current.classList.remove('active');
    };

    const handleMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 3; // 3x scroll speed
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div className="grid-container">
            <main className="grid-item main">
                <div
                    ref={sliderRef}
                    className="items"
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                >
                    {filteredBeaches.map((beach, id) => (
                        <div key={id} className={`item item${id + 1}`}>
                            <button onClick={() => navigate(`/beach/${beach.name}`)}>
                                <div>
                                    <p>Name: {beach.name}</p>
                                    <p>Location: {beach.location}</p>
                                    <hr />
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
