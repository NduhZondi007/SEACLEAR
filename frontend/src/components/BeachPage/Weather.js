import React, { Component } from 'react';

class Weather extends Component {
    render() {
        const { weather } = this.props;

        if (!weather) {
            return <div>Loading weather details...</div>;
        }

        return (
            <div>
                <h3>Weather</h3>
                <ul>
                    <li>Temperature: {weather.temperature}°C</li>
                    <li>Wind Speed: {weather.windSpeed} km/h</li>
                    <li>Humidity: {weather.humidity}%</li>
                    <li>Forecast: {weather.forecast}</li>
                    <li>Sea Level: {weather.seaLevel}hPa</li>
                </ul>
                </div>
        );
    }
}

export default Weather;
