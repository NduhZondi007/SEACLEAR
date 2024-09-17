import React from 'react';
import axios from 'axios';

class AddBeach extends React.Component {
  // Initial state includes fields for beach name, location, amenities, weather, and water quality
  state = {
    name: '',
    location: '',
    amenities: { // Amenities are stored as boolean values (checked/unchecked)
      Restaurants: false,
      Parking: false,
      Lifeguard: false,
      BeachChairs: false
    },
    weather: { // Weather details include temperature, wind speed, humidity, and forecast
      temperature: '',
      windSpeed: '',
      humidity: '',
      forecast: 'Sunny'
    },
    waterQuality: { // Water quality fields include pH level, pollution level, and safety status
      phLevel: '',
      pollutionLevel: '',
      isSafe: ''
    }
  };

  // Generic handler to capture input changes for text fields, select dropdowns, and checkboxes
  handleInputChange = (event) => {
    const { id, value, type, checked } = event.target;

    // Update amenities (checkboxes)
    if (type === 'checkbox') {
      this.setState(prevState => ({
        amenities: {
          ...prevState.amenities,
          [id]: checked
        }
      }));
    } 
    // Update water quality fields
    else if (id in this.state.waterQuality) {
      this.setState(prevState => ({
        waterQuality: {
          ...prevState.waterQuality,
          [id]: value
        }
      }));
    } 
    // Update weather fields
    else if (id in this.state.weather) {
      this.setState(prevState => ({
        weather: {
          ...prevState.weather,
          [id]: value
        }
      }));
    } 
    // Update general fields like name and location
    else {
      this.setState({ [id]: value });
    }
  }

  // Form submission handler to send data to the backend using axios
  handleSubmit = (event) => {
    event.preventDefault();

    const { name, location, amenities, weather, waterQuality } = this.state;

    // Filter out selected amenities (those checked as true)
    const selectedAmenities = Object.keys(amenities).filter(amenity => amenities[amenity]);

    // Axios POST request to add a new beach, including amenities, weather, and water quality data
    axios.post("https://seaclear-8.cs.uct.ac.za/api/beaches/", {
      name,
      location,
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
    .then(response => {
      console.log("Beach added successfully:", response.data);

      // Reset form fields to their initial state after a successful submission
      this.setState({
        name: '',
        location: '',
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
      });
    })
    .catch(error => {
      console.error("There was an error adding the beach!", error);
    });
  }

  render() {
    const { name, location, amenities, weather, waterQuality } = this.state;
  
    return (
      <div style={styles.formContainer}>
        <form onSubmit={this.handleSubmit}>
          <h3 style={styles.sectionTitle}>Beach Details</h3>
          <label style={styles.label}>
            Name
            <input id="name" type="text" value={name} onChange={this.handleInputChange} style={styles.input} />
          </label>
          <label style={styles.label}>
            Location
            <input id="location" type="text" value={location} onChange={this.handleInputChange} style={styles.input} />
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
            Pollution Level
            <input id="pollutionLevel" type="text" value={waterQuality.pollutionLevel} onChange={this.handleInputChange} style={styles.input} />
          </label>
          <label style={styles.label}>
            Is Safe
            <input id="isSafe" type="text" value={waterQuality.isSafe} onChange={this.handleInputChange} style={styles.input} />
          </label>
  
          <button type="submit" style={styles.button}>Add Beach</button>
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
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  checkbox: {
    marginRight: '8px',
  },
  select: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ddd',
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


export default AddBeach;
