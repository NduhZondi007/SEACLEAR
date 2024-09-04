import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

class Beach extends React.Component {
    state = {
        details: [],
    };
    componentDidMount() {
        axios
            .get('http://localhost:8000/beaches')
            .then((res) => {
                let data = res.data;
                console.log("Data", data);
                data = data.find(beach => beach.name === this.props.params.name);
                console.log("Weather", data.weather);
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
    
        if (!details || !details.weather) {
            return <div>Loading beach details...</div>; // Handle loading or no data
        }
    
        return (
            <div>
                <header>
                    <hr />
                    <p>Name: {details.name}</p>
                    <p>Location: {details.location}</p>
                    <p>Temperature: {details.weather.temperature}°C</p>
                    <p>Wind Speed: {details.weather.windSpeed} km/h</p>
                    <p>Humidity: {details.weather.humidity}%</p>
                    <p>Forecast: {details.weather.forecast}</p>
                    <h3>Amenities:</h3>
                    <ul>
                        {details.amenities.map((amenity, index) => (
                            <li key={index}>{amenity}</li>
                        ))}
                    </ul>
                </header>
            </div>
        );
    }
}

// Wrapper component to inject params
function BeachWithParams(props) {
    const params = useParams();
    return <Beach {...props} params={params} />;
}

export default BeachWithParams;
