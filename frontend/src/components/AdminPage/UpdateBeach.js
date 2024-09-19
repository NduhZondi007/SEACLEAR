import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './UpdateBeach.css'; // Import the CSS file
import Navbar from '../Navbar/Navbar';

class UpdateBeach extends React.Component {
    state = {
        id: 0,
        name: '',
        location: '',
        latitude: '',
        longitude: '',
        amenities: {
            Restaurants: false,
            Parking: false,
            Lifeguard: false,
            BeachChairs: false
        },
        weather: {
            temperature: '',
            windSpeed: '',
            humidity: '',
            forecast: 'Sunny'
        },
        waterQuality: {
            phLevel: '',
            pollutionLevel: '',
            isSafe: ''
        },
        error: null,
    };

    componentDidMount() {
        const { name } = this.props.params;
        axios
            .get('http://localhost:8000/beaches')
            .then((res) => {
                let data = res.data;
                data = data.find(beach => beach.name === name);
                this.setState({
                    id: data.id,
                    name: data.name,
                    location: data.location,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    weather: data.weather,
                    waterQuality: data.waterQuality
                });
            })
            .catch((err) => {
                console.error('There was an error fetching the data!', err);
            });
    }

    handleInputChange = (event) => {
        const { id, value, type, checked } = event.target;
        
        if (type === 'checkbox') {
            this.setState(prevState => ({
                amenities: {
                    ...prevState.amenities,
                    [id]: checked
                }
            }));
        } else if (id in this.state.waterQuality) {
            this.setState(prevState => ({
                waterQuality: {
                    ...prevState.waterQuality,
                    [id]: value
                }
            }));
        } else if (id in this.state.weather) {
            this.setState(prevState => ({
                weather: {
                    ...prevState.weather,
                    [id]: value
                }
            }));
        } else {
            this.setState({ [id]: value });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { id, name, location, latitude, longitude, amenities, weather, waterQuality } = this.state;

        const selectedAmenities = Object.keys(amenities).filter(amenity => amenities[amenity]);

        axios.put(`http://localhost:8000/beaches/${id}/`, {
            name,
            location,
            latitude,
            longitude,
            amenities: selectedAmenities,
            weather: {
                temperature: weather.temperature,
                windSpeed: weather.windSpeed,
                humidity: weather.humidity,
                forecast: weather.forecast
            },
            waterQuality: {
                phLevel: waterQuality.phLevel,
                pollutionLevel: waterQuality.pollutionLevel,
            }
        })
        .then(() => {
            // Handle successful update
        })
        .catch(error => {
            this.setState({ error: 'There was an error updating the beach. Please try again.' });
            console.error("There was an error updating the beach!", error);
        });
    }

    render() {
        const { name, location, latitude, longitude, amenities, weather, waterQuality, error } = this.state;
    
        return (
            <div>
            <Navbar/>
            <div id="ContainerContainer">
            <div className="formContainer">
                {error && <p className="errorMessage">{error}</p>}
                <form onSubmit={this.handleSubmit}>
                    <h3 className="sectionTitle">Beach Details</h3>
                    <label className="label">
                        Name
                        <input id="name" type="text" value={name} readOnly className="input" />
                    </label>
                    <label className="label">
                        Location
                        <input id="location" type="text" value={location} onChange={this.handleInputChange} className="input" />
                    </label>
                    <label className="label">
                        Latitude
                        <input id="latitude" type="number" step="0.0001" value={latitude} onChange={this.handleInputChange} className="input" />
                    </label>
                    <label className="label">
                        Longitude
                        <input id="longitude" type="number" step="0.0001" value={longitude} onChange={this.handleInputChange} className="input" />
                    </label>
    
                    <h3 className="sectionTitle">Amenities</h3>
                    {Object.keys(amenities).map(amenity => (
                        <label key={amenity} className="checkboxLabel">
                            <input
                                type="checkbox"
                                id={amenity}
                                checked={amenities[amenity]}
                                onChange={this.handleInputChange}
                                className="checkbox"
                            />
                            {amenity}
                        </label>
                    ))}
    
                    <h3 className="sectionTitle">Weather</h3>
                    <label className="label">
                        Temp
                        <input id="temperature" type="number" value={weather.temperature} onChange={this.handleInputChange} className="input" />
                    </label>
                    <label className="label">
                        Wind Speed
                        <input id="windSpeed" type="number" value={weather.windSpeed} onChange={this.handleInputChange} className="input" />
                    </label>
                    <label className="label">
                        Humidity
                        <input id="humidity" type="number" value={weather.humidity} onChange={this.handleInputChange} className="input" />
                    </label>
                    <label className="label">
                        Forecast
                        <select id="forecast" value={weather.forecast} onChange={this.handleInputChange} className="select">
                            <option value="Sunny">Sunny</option>
                            <option value="Cloudy">Cloudy</option>
                            <option value="Overcast">Overcast</option>
                            <option value="Rainy">Rainy</option>
                            <option value="Thunderstorms">Thunderstorms</option>
                            <option value="Snow">Snow</option>
                            <option value="Hail">Hail</option>
                        </select>
                    </label>
    
                    <h3 className="sectionTitle">Water Quality</h3>
                    <label className="label">
                        pH Level
                        <input id="phLevel" type="number" value={waterQuality.phLevel} onChange={this.handleInputChange} className="input" />
                    </label>
                    <label className="label">
                        Pollution
                        <select id="pollutionLevel" value={waterQuality.pollutionLevel} onChange={this.handleInputChange} className="select">
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </label>
    
                    <button type="submit" className="button">Update Beach</button>
                </form>
            </div>
            </div>
            </div>
        );
    }
}

function UpdateBeachWithParams() {
    const params = useParams();
    return <UpdateBeach params={params} />;
}

export default UpdateBeachWithParams;
