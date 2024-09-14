import React, { Component } from 'react';

class Amenities extends Component {
    // The render method displays the component's UI
    render() {
        const { amenities } = this.props;
    
        // Ensure that amenities is an array, otherwise default to an empty array
        const amenitiesList = Array.isArray(amenities) ? amenities : [];
    
        // Display a loading message if the amenities list is empty (optional)
        if (amenitiesList.length === 0) {
            return <div>
                <h3>Amenities</h3>
                No amenities available.
                </div>;  // Handle the case where there are no amenities
        }
    
        return (
            <div>
                <h3>Amenities</h3>
                <ul>
                    {amenitiesList.map((amenity, index) => (
                        <li key={index}>{amenity}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Amenities; // Export the component for use in other parts of the app
