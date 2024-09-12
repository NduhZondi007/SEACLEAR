import React, { Component } from 'react';
import axios from 'axios';

const api = {
  key: "540cc3b264acd7f2069773355d068cad",
  base: "https://api.openweathermap.org/data/2.5/",
};

class BeachComponent extends Component {
  state = {
    beaches: []
  };

  componentDidMount() {
    axios
      .get('http://localhost:8000/beaches')
      .then((res) => {
        const beaches = res.data;
        this.setState({ beaches });
        beaches.forEach(beach => {
          this.fetchWeather(beach);
        });
      })
      .catch((err) => {
        console.error('There was an error fetching the data!', err);
      });
  }

  fetchWeather(beach) {
    const { latitude, longitude, id, name, location, amenities, waterQuality } = beach;

    fetch(`${api.base}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((weatherData) => {
        console.log("featches data", weatherData)
        const updatedWeather = {
          temperature: weatherData.main.temp,
          windSpeed: weatherData.wind.speed,
          humidity: weatherData.main.humidity,
          forecast: weatherData.weather[0].description,
          seaLevel: weatherData.main.sea_level
        };

        this.updateBeachWeather(id, name, location, latitude, longitude, amenities, updatedWeather, waterQuality);
      })
      .catch((error) => {
        console.error(`Error fetching weather data for ${name}:`, error);
      });
  }

  updateBeachWeather(id, name, location, latitude, longitude, amenities, weather, waterQuality) {

    axios.put(`http://127.0.0.1:8000/beaches/${id}/`, {
      name,
      location,
      latitude,
      longitude,
      amenities: {
        Restaurants: amenities.Restaurants,
        Parking: amenities.Parking,
        Lifeguard: amenities.Lifeguard,
        BeachChairs: amenities.BeachChairs
      },
      weather: {
        temperature: weather.temperature,
        windSpeed: weather.windSpeed,
        humidity: weather.humidity,
        forecast: weather.forecast,
        seaLevel: weather.seaLevel
      },
      waterQuality: {
        phLevel: waterQuality.phLevel,
        pollutionLevel: waterQuality.pollutionLevel,
        isSafe: waterQuality.isSafe
      }
    })
    .then(response => {
      console.log(`Beach ${name} updated successfully:`, response.data);
    })
    .catch(error => {
      console.error(`Error updating the beach ${name}:`, error);
    });
  }

  render() {
    return (
      <div>
        <h1>Beach Weather Update</h1>
        <p>Updating weather for all beaches...</p>
      </div>
    );
  }
}

export default BeachComponent;
