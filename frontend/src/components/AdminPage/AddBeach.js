// AddBeach.js
import React from 'react';
import axios from 'axios';

class AddBeach extends React.Component {
  state = {
    name: '',
    location: '',
    amenities: {
      Restaurants: false,
      Parking: false,
      Lifeguard: false,
      BeachChairs: false
    },
    temperature: '',
    windSpeed: '',
    humidity: '',
    forecast: 'Sunny',
    waterQuality: {
      phLevel: '',
      pollutionLevel: '',
      isSafe: ''
    }
  };

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
    } else {
      this.setState({ [id]: value });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { name, location, amenities, temperature, windSpeed, humidity, forecast, waterQuality } = this.state;

    const selectedAmenities = Object.keys(amenities).filter(amenity => amenities[amenity]);

    axios.post("http://127.0.0.1:8000/beaches/", {
      name,
      location,
      amenities: selectedAmenities,
      weather: {
        temperature,
        windSpeed,
        humidity,
        forecast
      },
      waterQuality: {
        phLevel: waterQuality.phLevel,
        pollutionLevel: waterQuality.pollutionLevel,
        isSafe: waterQuality.isSafe
      }
    })
      .then(response => {
        console.log("Beach added successfully:", response.data);
        this.setState({
          name: '',
          location: '',
          amenities: {
            Restaurants: false,
            Parking: false,
            Lifeguard: false,
            BeachChairs: false
          },
          temperature: '',
          windSpeed: '',
          humidity: '',
          forecast: 'Sunny',
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
    const { name, location, amenities, temperature, windSpeed, humidity, forecast, waterQuality } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h3>Beach Details</h3>
          <label>
            Name
            <input id="name" type="text" value={name} onChange={this.handleInputChange} />
          </label>
          <label>
            Location
            <input id="location" type="text" value={location} onChange={this.handleInputChange} />
          </label>

          <h3>Amenities</h3>
          {Object.keys(amenities).map(amenity => (
            <label key={amenity}>
              <input
                type="checkbox"
                id={amenity}
                checked={amenities[amenity]}
                onChange={this.handleInputChange}
              />
              {amenity}
            </label>
          ))}

          <h3>Weather</h3>
          <label>
            Temp
            <input id="temperature" type="number" value={temperature} onChange={this.handleInputChange} />
          </label>
          <label>
            WindSpeed
            <input id="windSpeed" type="number" value={windSpeed} onChange={this.handleInputChange} />
          </label>
          <label>
            Humidity
            <input id="humidity" type="number" value={humidity} onChange={this.handleInputChange} />
          </label>
          <label>
            Forecast
            <select id="forecast" value={forecast} onChange={this.handleInputChange}>
              <option value="Sunny">Sunny</option>
              <option value="Cloudy">Cloudy</option>
              <option value="Overcast">Overcast</option>
              <option value="Rainy">Rainy</option>
              <option value="Thunderstorms">Thunderstorms</option>
              <option value="Snow">Snow</option>
              <option value="Hail">Hail</option>
            </select>
          </label>

          <h3>Water Quality</h3>
          <label>
            pH Level
            <input id="phLevel" type="number" value={waterQuality.phLevel} onChange={this.handleInputChange} />
          </label>
          <label>
            Pollution Level
            <input id="pollutionLevel" type="text" value={waterQuality.pollutionLevel} onChange={this.handleInputChange} />
          </label>
          <label>
            Is Safe
            <input id="isSafe" type="text" value={waterQuality.isSafe} onChange={this.handleInputChange} />
          </label>

          <button type="submit">Add Beach</button>
        </form>
      </div>
    );
  }
}

export default AddBeach;
