import React, { Component } from 'react';

class Amenities extends Component {
    // The render method displays the component's UI
    render() {
        // Destructure 'amenities' from the component's props
        const { amenities } = this.props;

        // If amenities are not yet loaded (e.g., null or undefined), show a loading message
        if (!amenities) {
            return <div>Loading amenities details...</div>; // Display this message until the data is available
        }

        // If amenities are available, render a list of them
        return (
            <div>
                <h3>Amenities</h3>
                <ul>
                    {/* Map over the amenities array and display each amenity in a list item */}
                    {amenities.map((amenity, index) => (
                        <li key={index}>{amenity}</li> // Use index as the key for each list item
                    ))}
                </ul>
            </div>
        );
    }
}

export default Amenities; // Export the component for use in other parts of the app
