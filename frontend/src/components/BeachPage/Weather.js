import React, { Component } from 'react';
import './Weather.css';  // Import external CSS for styling

class Weather extends Component {
    render() {
        const { weather } = this.props;

        if (!weather) {
            return <div className="loading">Loading weather details...</div>;
        }

        return (
            <div className="weather-container">
                <h3 className="weather-title">Weather</h3>
                <ul className="weather-list">
                    <li className="weather-list-item">Temperature: {weather.temperature}°C</li>
                    <li className="weather-list-item">Wind Speed: {weather.windSpeed} km/h</li>
                    <li className="weather-list-item">Humidity: {weather.humidity}%</li>
                    <li className="weather-list-item">Forecast: {weather.forecast}</li>
                    <li className="weather-list-item">Sea Level: {weather.seaLevel} hPa</li>
                </ul>
            </div>
        );
    }
}

export default Weather;
