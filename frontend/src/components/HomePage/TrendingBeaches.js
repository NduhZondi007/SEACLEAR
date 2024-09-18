import React, { useEffect, useRef, useState } from "react";
import './TrendingBeaches.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TrendingBeaches = ({ searchQuery }) => {
    const sliderRef = useRef(null);
    const [details, setDetails] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('http://localhost:8000/beaches') 
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

    return (
        <div className="grid-container">
            <main className="grid-item main">
                <div ref={sliderRef} className="items">
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
