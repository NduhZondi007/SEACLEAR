import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Weather from './Weather';
import Amenities from './Amenities';

class Beach extends React.Component {
    state = {
        details: [],
    };
    componentDidMount() {
        axios
            .get('http://localhost:8000/beaches')
            .then((res) => {
                let data = res.data;
                data = data.find(beach => beach.name === this.props.params.name);
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

        if (!details) {
            return <div>Loading beach details...</div>; // Handle loading or no data
        }

        return (
            <div>
                <header>
                    <hr />
                    <p>Name: {details.name}</p>
                    <p>Location: {details.location}</p>
                    <Weather weather={details.weather} />
                    <Amenities amenities={details.amenities} />
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
