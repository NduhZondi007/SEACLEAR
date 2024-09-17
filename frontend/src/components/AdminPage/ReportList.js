import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 

const ReportList = () => {
    // State to store the list of reports and error state
    const [details, setDetails] = useState([]);
    const [error, setError] = useState(null);
    
    const navigate = useNavigate();

    // Fetch the list of reports from the API
    useEffect(() => {
        axios
            .get('http://localhost:8000/reports/')
            .then((res) => {
                setDetails(res.data);
            })
            .catch((err) => {
                setError('There was an error fetching the data. Please try again.');
                console.error('Error fetching data:', err);
            });
    }, []);

    // Function to handle report click and navigate to the report details page
    const handleReportClick = (reportId) => {
        navigate(`/admin/report/${reportId}`);
    }

    return (
        <div style={styles.container}>
            {error ? (
                <p style={styles.errorMessage}>{error}</p> // Show error message if data fetching fails
            ) : (
                details.map((output, index) => (
                    <div key={index} style={styles.reportItem}>
                        <button 
                            style={styles.button} 
                            onClick={() => handleReportClick(output.id)}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                        >
                            <div style={styles.textContainer}>
                                <p style={styles.text}>Beach: {output.beach}</p>
                                <p style={styles.text}>Type: {output.reportType}</p>
                            </div>
                            <hr style={styles.separator} />
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

// Styles for the report list
const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        textAlign: 'center',
    },
    reportItem: {
        marginBottom: '10px',
    },
    button: {
        width: '100%',
        padding: '15px',
        borderRadius: '10px',
        border: '1px solid #ccc',
        backgroundColor: '#007BFF',
        color: '#fff',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
    textContainer: {
        textAlign: 'left',
    },
    text: {
        margin: '5px 0',
        fontSize: '1rem',
        color: '#333',
    },
    separator: {
        marginTop: '10px',
        borderTop: '1px solid #ddd',
    },
    errorMessage: {
        color: 'red',
        fontSize: '1.2rem',
    }
};

export default ReportList;
