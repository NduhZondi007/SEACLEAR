import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../UserContext';
import Navbar from '../navbar/Navbar';

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

        if (reportType === 'General') {
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
            <Navbar/>
            <div style={styles.container}>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <h3 style={styles.heading}>Report Details</h3>

                    {!username && (
                        <label style={styles.label}>
                            Username
                            <input
                                style={styles.input}
                                name="usernameInput"
                                type="text"
                                value={details.usernameInput}
                                onChange={handleInputChange}
                            />
                        </label>
                    )}

                    <label style={styles.label}>
                        Report Type
                        <select
                            style={styles.select}
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
                        <label style={styles.label}>
                            Beach Name
                            <select
                                style={styles.select}
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

                    <label style={styles.label}>
                        Urgency
                        <select
                            style={styles.select}
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

                    <label style={styles.label}>
                        Problem Type
                        <select
                            style={styles.select}
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

                    <label style={styles.label}>
                        Additional Info
                        <textarea
                            style={styles.textarea}
                            name="additionalInfo"
                            value={details.additionalInfo}
                            onChange={handleInputChange}
                        />
                    </label>

                    <button type="submit" style={styles.button}>Submit Report</button>
                </form>
            </div>

        </div>
    );
};

export default WriteReport;

// Define inline styles
const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    heading: {
        fontSize: '1.8rem',
        color: '#333',
        textAlign: 'center',
    },
    label: {
        fontSize: '1rem',
        color: '#555',
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        padding: '10px',
        fontSize: '1rem',
        borderRadius: '5px',
        border: '1px solid #ccc',
        marginTop: '5px',
    },
    select: {
        padding: '10px',
        fontSize: '1rem',
        borderRadius: '5px',
        border: '1px solid #ccc',
        marginTop: '5px',
    },
    textarea: {
        padding: '10px',
        fontSize: '1rem',
        borderRadius: '5px',
        border: '1px solid #ccc',
        minHeight: '100px',
        marginTop: '5px',
    },
    button: {
        padding: '12px 20px',
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#007BFF',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
};
