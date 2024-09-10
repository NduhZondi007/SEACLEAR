import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BeachList = () => {
    const [details, setDetails] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('http://localhost:8000/beaches')
            .then((res) => {
                const data = res.data;
                setDetails(data);
            })
            .catch((err) => {
                console.error('There was an error fetching the data!', err);
            });
    }, []);

    const handleBeachClick = (name) => {
        navigate(`/admin/updateBeach/${name}`);
    }

    return (
        <div>
            {details.map((output, id) => (
                <div key={id}>
                    <button onClick={() => handleBeachClick(output.name)}>
                        <div>
                            <p>Name: {output.name}</p>
                            <p>Location: {output.location}</p>
                            <hr />
                        </div>
                    </button>
                </div>
            ))}
        </div>
    );
}

export default BeachList;
