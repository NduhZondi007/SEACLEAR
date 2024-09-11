import React from 'react';
import "./Map.css"
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon} from "leaflet";
import axios from 'axios';

// Create custom icon
const beachIcon = new Icon({
    iconUrl: require("./../../assets/images/happyFace.png"),
    iconSize: [38, 38]
});

// Custom cluster icon
const createClusterIcon = function () {
    return new Icon({
        iconUrl: require("./../../assets/images/blueCircle.png"),
        iconSize: [40, 40],
        iconAnchor: [19, 38],
        popupAnchor: [0, -38]
    });
};


function doNothing() { }

class Map extends React.Component {
    state = {
        details: [],  
    };

    componentDidMount() {
        axios
            .get('http://localhost:8000/beaches')
            .then((res) => {
                let data = res.data; 
                console.log("data", data)
                this.setState({
                    details: data,
                });
            })
            .catch((err) => {
                console.error('There was an error fetching the data!', err);
            });
    }

    render() {
        const { details } = this.state;

        if (details.length === 0) {
            return <div>Loading...</div>;
        }

        const firstLocation = details[0];

        return (
            <MapContainer id="mapCanvas" center={[firstLocation.latitude, firstLocation.longitude]} zoom={9}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterIcon} onClick={doNothing}>

                    {this.state.details.map((marker, index) => (
                        <Marker key={index} position={[marker.latitude, marker.longitude]} icon={beachIcon}>
                            <Popup>{marker.name}</Popup>
                        </Marker>
                    ))}

                </MarkerClusterGroup>
            </MapContainer>
        );
    }
}

export default Map;
