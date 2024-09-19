import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making API requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const BeachList = () => {
    // State to store the list of beach details fetched from the API
    const [details, setDetails] = useState([]);
    
    // useNavigate hook to navigate programmatically between routes
    const navigate = useNavigate();

    // useEffect hook to fetch the list of beaches from the API when the component mounts
    useEffect(() => {
        axios
            .get('http://localhost:8000//beaches') // Send a GET request to the API to retrieve beach details
            .then((res) => {
                const data = res.data; // Store the retrieved data in a variable
                setDetails(data); // Update the state with the fetched data
            })
            .catch((err) => {
                console.error('There was an error fetching the data!', err); // Log any error that occurs during the API call
            });
    }, []); // Empty dependency array ensures this effect runs only once when the component is mounted

    // Function to handle click event on a specific beach
    // It navigates to the update page for the selected beach
    const handleBeachClick = (name) => {
        navigate(`/admin/updateBeach/${name}`); // Navigate to the update page for the selected beach using its name as a URL parameter
    }

    return (
        <div style={styles.container}>
          {/* Map over the list of beach details and create a button for each beach */}
          {details.map((output, id) => (
            <div key={id}>
              <button
                style={styles.button}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                onClick={() => handleBeachClick(output.name)}
              >
                <div>
                  <p style={styles.beachDetails}>Name: {output.name}</p>
                  <p style={styles.beachDetails}>Location: {output.location}</p>
                  <hr style={styles.separator} />
                </div>
              </button>
              <button onClick={() => navigate(`/admin/uploadCsv/`)}>Add Dynamically</button>
            </div>
          ))}
        </div>
      );
      
}

const styles = {
    container: {
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
      textAlign: 'center',
    },
    button: {
      width: '100%',
      padding: '15px',
      margin: '10px 0',
      borderRadius: '10px',
      border: 'none',
      backgroundColor: '#007BFF',
      color: '#fff',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    beachDetails: {
      textAlign: 'left',
      fontSize: '1.2rem',
      color: '#333',
      margin: '0',
    },
    separator: {
      margin: '10px 0',
      borderTop: '1px solid #ddd',
    },
  };
  
export default BeachList;
