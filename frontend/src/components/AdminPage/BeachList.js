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
            .get('https://seaclear-8.cs.uct.ac.za/api/beaches') // Send a GET request to the API to retrieve beach details
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
        <div>
            {/* Map over the list of beach details and create a button for each beach */}
            {details.map((output, id) => (
                <div key={id}> {/* Use 'id' as the key for each beach element */}
                    <button onClick={() => handleBeachClick(output.name)}> {/* Button that navigates to the update page when clicked */}
                        <div>
                            {/* Display beach name and location */}
                            <p>Name: {output.name}</p>
                            <p>Location: {output.location}</p>
                            <hr /> {/* Horizontal line separator between beach details */}
                        </div>
                    </button>
                </div>
            ))}
        </div>
    );
}

export default BeachList;
