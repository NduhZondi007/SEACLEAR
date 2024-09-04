import React, { Component } from 'react';

class Amenities extends Component {
    render() {
        const { amenities } = this.props;

        if (!amenities) {
            return <div>Loading amenities details...</div>;
        }

        return (
            <div>
                <h3>Amenities</h3>
                <ul>
                    {amenities.map((amenity, index) => (
                        <li key={index}>{amenity}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Amenities;
