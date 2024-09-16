import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../UserContext';

const WriteReport = () => {
    const { username, setUsername } = useContext(UserContext);
    const [beaches, setBeaches] = useState([]);
    const [details, setDetails] = useState({
        usernameInput: '',
        reportType: '',
        beach: '',
        problemType: '',
        additionalInfo: '',
        urgency: ''
    });

    useEffect(() => {
        if (details.reportType === 'Beach Specific') {
            axios
                .get('http://localhost:8000/beaches')
                .then((res) => {
                    setBeaches(res.data); 
                })
                .catch((err) => {
                    console.error('There was an error fetching the data!', err);
                });
        }
    }, [details.reportType]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setDetails({ ...details, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        let { usernameInput, reportType, beach, problemType, additionalInfo, urgency } = details;
    
        const finalUsername = username || usernameInput;
    
        if (!finalUsername) {
            alert('Please provide a username.');
            return;
        }
    
        if (!reportType || (reportType === 'Beach Specific' && !beach) || !problemType || !additionalInfo || !urgency) {
            alert('Please fill out all fields before submitting.');
            return;
        }
    
        if (!username) {
            setUsername(usernameInput);
        }

        if(reportType==='General'){
            beach = "General";
        }
    
        axios.post(`http://127.0.0.1:8000/reports/`, {
            user: finalUsername,
            reportType,
            beach,
            problemType,
            additionalInfo,
            urgency
        })
        .then((response) => {
            alert('Report successfully submitted!');
            setDetails({
                usernameInput: '',
                reportType: '',
                beach: '',
                problemType: '',
                additionalInfo: '',
                urgency: ''
            });
        })
        .catch((error) => {
            console.error('There was an error updating the report!', error);
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Report Details</h3>

                {!username && (
                    <label>
                        Username
                        <input
                            name="usernameInput"
                            type="text"
                            value={details.usernameInput}
                            onChange={handleInputChange}
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
