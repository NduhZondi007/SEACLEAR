import React from 'react';
import { Icon } from "leaflet";
import { useNavigate } from 'react-router-dom';
import "./Map.css";

const createIconPath = () => {
    return require(`./../../assets/images/mapIcon.png`);
};

// Functional component for MapIcon
const MapIcon = () => {
    const navigate = useNavigate();
    
    const handleMapClick = () => {
        navigate(`/map`); // Navigate to the map page
    };

    return (
        <button id='mapIcon' onClick={handleMapClick}>
            <img src={createIconPath()}/>
        </button>
    );
};

export default MapIcon;
