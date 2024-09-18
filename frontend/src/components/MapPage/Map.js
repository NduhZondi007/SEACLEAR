import React, { useState, useEffect } from 'react';
import "./Map.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon } from "leaflet";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from '../Navbar/Navbar';
import L from 'leaflet';

// Function to create custom icons dynamically based on safety status
const createIcon = (safetyStatus) => {
    const iconPath = require(`./../../assets/images/${safetyStatus}.png`); // Construct the path dynamically
    return new Icon({
        iconUrl: iconPath,
        iconSize: [38, 38]
    });
};

// Custom cluster icon using divIcon to show the number of markers in the cluster
const createClusterIcon = function (cluster) {
    // Get the count of markers in the cluster
    const count = cluster.getChildCount();

    return L.divIcon({
        html: `<div class="cluster-icon">${count}</div>`,
        className: 'custom-cluster-icon', // Add a custom class for styling
        iconSize: L.point(40, 40, true),
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
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
        <>
        <Navbar/>
        <MapContainer id="mapCanvas" center={[firstLocation.latitude, firstLocation.longitude]} zoom={9}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterIcon}>
                {details.map((marker, index) => {
                    const safetyStatus = marker.waterQuality.isSafe.replace(" ", '').replace("M", "m"); // sometimes it files Medium instead of medium.png
                    const icon = createIcon(safetyStatus);

                    return (
                        <Marker key={index} position={[marker.latitude, marker.longitude]} icon={icon}>
                            <Popup>Visit <button onClick={() => handleMarkerClick(marker.name)}>{marker.name}</button></Popup>
                        </Marker>
                    );
                })}
            </MarkerClusterGroup>
        </MapContainer>
        </>
    );
};

export default Map;
