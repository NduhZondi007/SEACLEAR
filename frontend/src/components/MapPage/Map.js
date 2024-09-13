import React, { useState, useEffect } from 'react';
import "./Map.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon } from "leaflet";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Function to create custom icons dynamically based on safety status
const createIcon = (safetyStatus) => {
    const iconPath = require(`./../../assets/images/${safetyStatus}.png`); // Construct the path dynamically
    return new Icon({
        iconUrl: iconPath,
        iconSize: [38, 38]
    });
};

// Custom cluster icon
const createClusterIcon = function () {
    return new Icon({
        iconUrl: require("./../../assets/images/blueCircle.png"),
        iconSize: [40, 40],
        iconAnchor: [19, 38],
        popupAnchor: [0, -38]
    });
};


// Functional component for Map
const Map = () => {
    const [details, setDetails] = useState([]); // State for beach details
    const navigate = useNavigate(); // useNavigate hook for navigation

    useEffect(() => {
        axios
            .get('https://seaclear-8.cs.uct.ac.za/api/beaches')
            .then((res) => {
                let data = res.data;
                console.log("data", data);
                setDetails(data);
            })
            .catch((err) => {
                console.error('There was an error fetching the data!', err);
            });
    }, []); // Empty dependency array to run once on mount
    
    const handleMarkerClick = (name) => {
        navigate(`/beach/${name}`); // Navigate to the update page for the selected beach using its name as a URL parameter
    }

    if (details.length === 0) {
        return <div>Loading...</div>;
    }

    const firstLocation = details[0];


    return (
        <MapContainer id="mapCanvas" center={[firstLocation.latitude, firstLocation.longitude]} zoom={9}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterIcon}>
                {details.map((marker, index) => {
                    const safetyStatus = marker.waterQuality.isSafe.replace(" ", '');
                    const icon = createIcon(safetyStatus);

                    return (
                        <Marker key={index} position={[marker.latitude, marker.longitude]} icon={icon}>
                            <Popup>Visit <button onClick={() => handleMarkerClick(marker.name)}>{marker.name}</button></Popup>
                        </Marker>
                    );
                })}
            </MarkerClusterGroup>
        </MapContainer>
    );
};

export default Map;
