import React, { Component } from 'react';

class Amenities extends Component {
    // The render method displays the component's UI
    render() {
        const { amenities } = this.props;
    
        // Ensure that amenities is an array, otherwise default to an empty array
        const amenitiesList = Array.isArray(amenities) ? amenities : [];
    
        // Display a loading message if the amenities list is empty (optional)
        if (amenitiesList.length === 0) {
            return (
                <div style={styles.container}>
                    <h3 style={styles.title}>Amenities</h3>
                    <p style={styles.noAmenities}>No amenities available.</p> {/* Handle the case where there are no amenities */}
                </div>
            );
        }
    
        return (
            <div style={styles.container}>
                <h3 style={styles.title}>Amenities</h3>
                <ul style={styles.list}>
                    {amenitiesList.map((amenity, index) => (
                        <li key={index} style={styles.listItem}>
                            {amenity}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

// Define inline styles
const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '0 auto',
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '15px',
    color: '#343a40',
  },
  noAmenities: {
    fontStyle: 'italic',
    color: '#6c757d',
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
};

export default Amenities;
