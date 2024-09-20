import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './WriteReport.css';
import { UserContext } from '../../UserContext';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

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
                .get('https://seaclear-8.cs.uct.ac.za/api/beaches')
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

        if (reportType === 'General') {
            beach = "General";
        }
    
        axios.post(`https://seaclear-8.cs.uct.ac.za/api/reports/`, {
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
        <div className="report-container">
            <Navbar />
            <div className="report-form-container">
                <form onSubmit={handleSubmit} className="report-form">
                    <h3 className="report-heading">Report Details</h3>

                    {!username && (
                        <label className="report-label">
                            Username
                            <input
                                className="report-input"
                                name="usernameInput"
                                type="text"
                                value={details.usernameInput}
                                onChange={handleInputChange}
                            />
                        </label>
                    )}

                    <label className="report-label">
                        Report Type
                        <select
                            className="report-select"
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
                        <label className="report-label">
                            Beach Name
                            <select
                                className="report-select"
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

                    <label className="report-label">
                        Urgency
                        <select
                            className="report-select"
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

                    <label className="report-label">
                        Problem Type
                        <select
                            className="report-select"
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

                    <label className="report-label">
                        Additional Info
                        <textarea
                            className="report-textarea"
                            name="additionalInfo"
                            value={details.additionalInfo}
                            onChange={handleInputChange}
                        />
                    </label>

                    <button type="submit" className="report-button">Submit Report</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default WriteReport;
