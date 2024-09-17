import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

class ViewReport extends React.Component {
    state = {
        id: 0,
        user: '',
        reportType: '',
        beach: '',
        problemType: '',
        status: '',
        additionalInfo: '',
        urgency: ''
    };

    componentDidMount() {
        const { reportId } = this.props.params;

        axios
            .get('http://localhost:8000/reports')
            .then((res) => {
                let data = res.data;
                data = data.find(report => report.id === parseInt(reportId));
                if (data) {
                    this.setState({
                        id: data.id,
                        user: data.user,
                        reportType: data.reportType,
                        beach: data.beach,
                        problemType: data.problemType,
                        status: data.status,
                        additionalInfo: data.additionalInfo,
                        urgency: data.urgency
                    });
                }
            })
            .catch((err) => {
                console.error('There was an error fetching the data!', err);
            });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { id, user, reportType, beach, problemType, status, additionalInfo, urgency } = this.state;

        axios.put(`http://127.0.0.1:8000/reports/${id}/`, {
            user,
            reportType,
            beach,
            problemType,
            status,
            additionalInfo,
            urgency
        })
        .catch(error => {
            console.error("There was an error updating the report!", error);
        });
    }

    handleInputChange = (event) => {
        const { id, value } = event.target;
        this.setState({ [id]: value });
    }

    render() {
        const { user, reportType, beach, problemType, status, additionalInfo, urgency } = this.state;
    
        return (
            <div style={styles.formContainer}>
                <form onSubmit={this.handleSubmit}>
                    <h3 style={styles.sectionTitle}>Report Details</h3>
    
                    <label style={styles.label}>
                        User
                        <input id="user" type="text" value={user} onChange={this.handleInputChange} style={styles.input} />
                    </label>
                    <label style={styles.label}>
                        Beach Name
                        <input id="beach" type="text" value={beach} onChange={this.handleInputChange} style={styles.input} />
                    </label>
                    <label style={styles.label}>
                        Report Type
                        <input id="reportType" type="text" value={reportType} onChange={this.handleInputChange} style={styles.input} />
                    </label>
                    <label style={styles.label}>
                        Urgency
                        <select id="urgency" value={urgency} onChange={this.handleInputChange} style={styles.select}>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </label>
                    <label style={styles.label}>
                        Status
                        <select id="status" value={status} onChange={this.handleInputChange} style={styles.select}>
                            <option value="Pending">Pending</option>
                            <option value="Viewed">Viewed</option>
                            <option value="Resolved">Resolved</option>
                        </select>
                    </label>
                    <label style={styles.label}>
                        Problem Type
                        <select id="problemType" value={problemType} onChange={this.handleInputChange} style={styles.select}>
                            <option value="Pollution">Pollution</option>
                            <option value="Safety">Safety</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>
                    <label style={styles.label}>
                        Additional Info
                        <textarea id="additionalInfo" value={additionalInfo} onChange={this.handleInputChange} style={styles.textarea} />
                    </label>
    
                    <button type="submit" style={styles.button}>Update Report</button>
                </form>
            </div>
        );
    }
    
}

const styles = {
    formContainer: {
      padding: '20px',
      margin: '0 auto',
      maxWidth: '600px',
      textAlign: 'left',
      backgroundColor: '#f0f8ff',  // Light background for distinction
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    sectionTitle: {
      fontSize: '1.5rem',
      marginBottom: '10px',
      color: '#333',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontSize: '1rem',
      fontWeight: '500',
      color: '#555',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '15px',
      fontSize: '1rem',
      borderRadius: '5px',
      border: '1px solid #ddd',
      boxSizing: 'border-box',
    },
    select: {
      width: '100%',
      padding: '10px',
      marginBottom: '15px',
      fontSize: '1rem',
      borderRadius: '5px',
      border: '1px solid #ddd',
    },
    textarea: {
      width: '100%',
      height: '100px',
      padding: '10px',
      marginBottom: '15px',
      fontSize: '1rem',
      borderRadius: '5px',
      border: '1px solid #ddd',
      boxSizing: 'border-box',
    },
    button: {
      padding: '10px 20px',
      fontSize: '1rem',
      backgroundColor: '#28a745',  // Green for success
      color: '#fff',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
  };
  
  styles.button[':hover'] = {
    backgroundColor: '#218838',
  };
   

// Functional Component Wrapper to use useParams hook
function ReportWithParams() {
    const params = useParams();  // Hook to access URL parameters
    return <ViewReport params={params}/>;  // Pass params as prop to ViewReport
}

export default ReportWithParams;
