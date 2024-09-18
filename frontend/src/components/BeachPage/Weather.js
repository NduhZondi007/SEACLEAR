import React, { Component } from 'react';

class Weather extends Component {
    render() {
        const { weather } = this.props;

        if (!weather) {
            return <div style={styles.loading}>Loading weather details...</div>;
        }

        return (
            <div style={styles.container}>
                <h3 style={styles.title}>Weather</h3>
                <ul style={styles.list}>
                    <li style={styles.listItem}>Temperature: {weather.temperature}°C</li>
                    <li style={styles.listItem}>Wind Speed: {weather.windSpeed} km/h</li>
                    <li style={styles.listItem}>Humidity: {weather.humidity}%</li>
                    <li style={styles.listItem}>Forecast: {weather.forecast}</li>
                    <li style={styles.listItem}>Sea Level: {weather.seaLevel} hPa</li>
                </ul>
            </div>
        );
    }
}

// Define inline styles
const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#f0f8ff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        margin: '0 auto',
        textAlign: 'center',
    },
    title: {
        fontSize: '1.5rem',
        marginBottom: '15px',
        color: '#007BFF',
    },
    list: {
        listStyleType: 'none',
        padding: '0',
    },
    listItem: {
        backgroundColor: '#007BFF',
        color: '#fff',
        padding: '10px',
        marginBottom: '5px',
        borderRadius: '5px',
    },
    loading: {
        textAlign: 'center',
        fontSize: '1rem',
        color: '#6c757d',
    },
};

export default Weather;
