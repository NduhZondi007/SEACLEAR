import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../UserContext';

const WriteReport = () => {
    const { username, setUsername } = useContext(UserContext); // Get username from context
    const [beaches, setBeaches] = useState([]); // To store the list of beaches
    const [details, setDetails] = useState({
        usernameInput: '', // Temporarily store the username input for form before submission
        reportType: '',
        beach: '',
        problemType: '',
        additionalInfo: '',
        urgency: ''
    });

    useEffect(() => {
        if (details.reportType === 'Beach Specific') {
            axios
                .get('http://localhost:8000/beaches') // Send a GET request to the API to retrieve beach details
                .then((res) => {
                    setBeaches(res.data); // Store the retrieved beach list in the state
                })
                .catch((err) => {
                    console.error('There was an error fetching the data!', err); // Log any error that occurs during the API call
                });
        }
    }, [details.reportType]); // Fetch beaches only if the report type is "Beach Specific"

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setDetails({ ...details, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const { usernameInput, reportType, beach, problemType, additionalInfo, urgency } = details;

        // Use username from context if available, otherwise use the typed usernameInput
        const finalUsername = username || usernameInput;

        // Check if the username is missing and ask for it if necessary
        if (!finalUsername) {
            alert('Please provide a username.');
            return;
        }

        if (!reportType || (reportType === 'Beach Specific' && !beach) || !problemType || !additionalInfo || !urgency) {
            alert('Please fill out all fields before submitting.');
            return; // Stop form submission if any field is empty
        }

        // Set the username in context once the user presses submit
        if (!username) {
            setUsername(usernameInput); // Update the context with the input username
        }

        axios.post(`http://127.0.0.1:8000/reports/`, {
            user: finalUsername, // Use username from context or the entered username
            reportType,
            beach,
            problemType,
            additionalInfo,
            urgency
        })
        .catch((error) => {
            console.error('There was an error updating the report!', error);
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Report Details</h3>

                {/* If no username is set in the context, display the input field */}
                {!username && (
                    <label>
                        Username
                        <input
                            name="usernameInput"
                            type="text"
                            value={details.usernameInput}
                            onChange={handleInputChange} // Store username in local state temporarily
                        />
                    </label>
                )}

                <label>
                    Report Type
                    <select
                        name="reportType"
                        value={details.reportType}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Report Type</option>
                        <option value="Beach Specific">Beach Specific</option>
                        <option value="General">General</option>
                    </select>
                </label>

                {/* Conditionally render beach selection only if reportType is "Beach Specific" */}
                {details.reportType === 'Beach Specific' && (
                    <label>
                        Beach Name
                        <select
                            name="beach"
                            value={details.beach}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Beach</option>
                            {beaches.map((beach) => (
                                <option key={beach.id} value={beach.name}>
                                    {beach.name}
                                </option>
                            ))}
                        </select>
                    </label>
                )}

                <label>
                    Urgency
                    <select
                        name="urgency"
                        value={details.urgency}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Urgency</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </label>
                <label>
                    Problem Type
                    <select
                        name="problemType"
                        value={details.problemType}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Problem</option>
                        <option value="Pollution">Pollution</option>
                        <option value="Safety">Safety</option>
                        <option value="Other">Other</option>
                    </select>
                </label>
                <label>
                    Additional Info
                    <textarea
                        name="additionalInfo"
                        value={details.additionalInfo}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Update Report</button>
            </form>
        </div>
    );
};

export default WriteReport;
