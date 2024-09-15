import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making API requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation

const ReportList = () => {
    // State to store the list of reports fetched from the API
    const [details, setDetails] = useState([]);
    
    // useNavigate hook to navigate between routes
    const navigate = useNavigate();

    // useEffect hook to fetch the list of reports from the API when the component mounts
    useEffect(() => {
        axios
            .get('https://seaclear-8.cs.uct.ac.za/api/reports/') // Send a GET request to the API to retrieve reports
            .then((res) => {
                const data = res.data; // Store the retrieved data in a variable
                setDetails(data); // Update the state with the fetched data
            })
            .catch((err) => {
                console.error('There was an error fetching the data!', err); // Log any errors during the API call
            });
    }, []); // Empty dependency array ensures this effect runs only once when the component is mounted

    // Function to handle the click event on a specific report
    // It navigates to the update page for the selected report
    const handleReportClick = (reportId) => {
        navigate(`/admin/report/${reportId}`); // Navigate to the update page for the selected report using its ID as a URL parameter
    }

    return (
        <div>
            {/* Map over the list of reports and create a button for each report */}
            {details.map((output, id) => (
                <div key={id}> {/* Use 'id' as the key for each report element */}
                    <button onClick={() => handleReportClick(output.id)}> {/* Button that navigates to the update page when clicked */}
                        <div>
                            {/* Display report beach and type */}
                            <p>Name: {output.beach}</p>
                            <p>Type: {output.reportType}</p>
                            <hr /> {/* Horizontal line separator between report details */}
                        </div>
                    </button>
                </div>
            ))}
        </div>
    );
}

export default ReportList;
