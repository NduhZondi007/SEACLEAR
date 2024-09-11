import React from 'react';
import "./Map.css"
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, dIcon, point } from "leaflet";

// Create custom icon
const beachIcon = new Icon({
  iconUrl: require("./../../assets/images/happyFace.png"),
  iconSize: [38, 38] // Size of the icon
});

// Custom cluster icon
const createClusterIcon = function (cluster) {
    return new Icon({
      iconUrl: require("./../../assets/images/blueCircle.png"),
      iconSize: [40, 40], // Same size as the beach icons
      iconAnchor: [19, 38], // Anchor icon to the bottom center
      popupAnchor: [0, -38] // Anchor popup to the top center
    });
  };

// Markers
const markers = [
  {
    position: [-33.9507, 18.3776],
    beachName: "Camps Bay"
  },
  {
    position: [-33.9469, 18.3777],
    beachName: "Geln Beach"
  },
  {
    position: [-33.9406, 18.3751],
    beachName: "Clifton Beach"
  }
];

function doNothing(){}

class Map extends React.Component {
  render() {
    return (
      <MapContainer id="mapCanvas" center={[-33.918861, 18.423300]} zoom={9}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterIcon} onClick={doNothing}>

          {markers.map((marker, index) => (
            <Marker key={index} position={marker.position} icon={beachIcon}>
              <Popup>{marker.beachName}</Popup>
            </Marker>
          ))}

        </MarkerClusterGroup>
      </MapContainer>
    );
  }
}

export default Map;
