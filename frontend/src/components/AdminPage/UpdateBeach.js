import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

class UpdateBeach extends React.Component {
    state = {
        id: 0,
        name: '',
        location: '',
        latitude: '',  // Added latitude field
        longitude: '', // Added longitude field
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
        }
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
                    latitude: data.latitude,  // Set the latitude from the fetched data
                    longitude: data.longitude, // Set the longitude from the fetched data
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

        axios.put(`http://127.0.0.1:8000/beaches/${id}/`, {
            name,
            location,
            latitude,  // Include latitude in the PUT request
            longitude, // Include longitude in the PUT request
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
                isSafe: waterQuality.isSafe
            }
        })
        .catch(error => {
            console.error("There was an error updating the beach!", error);
        });
    }

    render() {
        const { name, location, latitude, longitude, amenities, weather, waterQuality } = this.state;
    
        return (
            <div style={styles.formContainer}>
                <form onSubmit={this.handleSubmit}>
                    <h3 style={styles.sectionTitle}>Beach Details</h3>
                    <label style={styles.label}>
                        Name
                        <input id="name" type="text" value={name} readOnly style={styles.input} />
                    </label>
                    <label style={styles.label}>
                        Location
                        <input id="location" type="text" value={location} onChange={this.handleInputChange} style={styles.input} />
                    </label>
                    <label style={styles.label}>
                        Latitude
                        <input id="latitude" type="number" step="0.0001" value={latitude} onChange={this.handleInputChange} style={styles.input} />
                    </label>
                    <label style={styles.label}>
                        Longitude
                        <input id="longitude" type="number" step="0.0001" value={longitude} onChange={this.handleInputChange} style={styles.input} />
                    </label>
    
                    <h3 style={styles.sectionTitle}>Amenities</h3>
                    {Object.keys(amenities).map(amenity => (
                        <label key={amenity} style={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                id={amenity}
                                checked={amenities[amenity]}
                                onChange={this.handleInputChange}
                                style={styles.checkbox}
                            />
                            {amenity}
                        </label>
                    ))}
    
                    <h3 style={styles.sectionTitle}>Weather</h3>
                    <label style={styles.label}>
                        Temp
                        <input id="temperature" type="number" value={weather.temperature} onChange={this.handleInputChange} style={styles.input} />
                    </label>
                    <label style={styles.label}>
                        Wind Speed
                        <input id="windSpeed" type="number" value={weather.windSpeed} onChange={this.handleInputChange} style={styles.input} />
                    </label>
                    <label style={styles.label}>
                        Humidity
                        <input id="humidity" type="number" value={weather.humidity} onChange={this.handleInputChange} style={styles.input} />
                    </label>
                    <label style={styles.label}>
                        Forecast
                        <select id="forecast" value={weather.forecast} onChange={this.handleInputChange} style={styles.select}>
                            <option value="Sunny">Sunny</option>
                            <option value="Cloudy">Cloudy</option>
                            <option value="Overcast">Overcast</option>
                            <option value="Rainy">Rainy</option>
                            <option value="Thunderstorms">Thunderstorms</option>
                            <option value="Snow">Snow</option>
                            <option value="Hail">Hail</option>
                        </select>
                    </label>
    
                    <h3 style={styles.sectionTitle}>Water Quality</h3>
                    <label style={styles.label}>
                        pH Level
                        <input id="phLevel" type="number" value={waterQuality.phLevel} onChange={this.handleInputChange} style={styles.input} />
                    </label>
                    <label style={styles.label}>
                        Pollution
                        <select id="pollutionLevel" value={waterQuality.pollutionLevel} onChange={this.handleInputChange} style={styles.select}>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </label>
                    <label style={styles.label}>
                        Risk
                        <select id="isSafe" value={waterQuality.isSafe} onChange={this.handleInputChange} style={styles.select}>
                            <option value="Safe">Safe</option>
                            <option value="Medium">Medium</option>
                            <option value="Not Safe">Not Safe</option>
                        </select>
                    </label>
    
                    <button type="submit" style={styles.button}>Update Beach</button>
                </form>
            </div>
        );
    }
    
}

const styles = {
    formContainer: {
      padding: '20px',
      margin: '0 auto',
      maxWidth: '600px',
      textAlign: 'left',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    sectionTitle: {
      fontSize: '1.5rem',
      marginBottom: '10px',
      color: '#333',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontSize: '1rem',
      fontWeight: '500',
      color: '#555',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '15px',
      fontSize: '1rem',
      borderRadius: '5px',
      border: '1px solid #ddd',
      boxSizing: 'border-box',
    },
    select: {
      width: '100%',
      padding: '10px',
      marginBottom: '15px',
      fontSize: '1rem',
      borderRadius: '5px',
      border: '1px solid #ddd',
    },
    checkboxLabel: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px',
    },
    checkbox: {
      marginRight: '8px',
    },
    button: {
      padding: '10px 20px',
      fontSize: '1rem',
      backgroundColor: '#007BFF',
      color: '#fff',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
  };
  
  styles.button[':hover'] = {
    backgroundColor: '#0056b3',
  };
  

function UpdateBeachWithParams() {
    const params = useParams();
    return <UpdateBeach params={params} />;
}

export default UpdateBeachWithParams;
