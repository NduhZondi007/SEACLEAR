import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WriteReport.css';  

const WriteReport = () => {
  const [reportDetails, setReportDetails] = useState({
    beachName: '',
    reportText: '',
    reportCategory: 'General',
    urgencyLevel: 'Low',
  });
  
  const [beaches, setBeaches] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    
    axios.get('http://localhost:8000/beaches')
      .then(response => {
        setBeaches(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching beach data');
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setReportDetails(prevDetails => ({
      ...prevDetails,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8000/community-reports/', reportDetails)
      .then(response => {
        console.log('Report submitted successfully:', response.data);
       
        setReportDetails({
          beachName: '',
          reportText: '',
          reportCategory: 'General',
          urgencyLevel: 'Low',
        });
      })
      .catch(error => {
        console.error('Error submitting the report:', error);
        setError('Failed to submit the report. Please try again.');
      });
  };

  if (loading) {
    return <p>Loading beaches...</p>;
  }

  return (
    <div className="report-container">
      <h2>Submit a Community Report</h2>
      {error && <p className="error-message">{error}</p>} {/* Display error messages */}
      <form onSubmit={handleSubmit} className="report-form">
        <label>
          Beach Name
          <select id="beachName" value={reportDetails.beachName} onChange={handleChange} required>
            <option value="">Select a Beach</option>
            {beaches.map(beach => (
              <option key={beach.id} value={beach.name}>
                {beach.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Report Category
          <select id="reportCategory" value={reportDetails.reportCategory} onChange={handleChange} required>
            <option value="General">General</option>
            <option value="Water Quality">Water Quality</option>
            <option value="Pollution">Pollution</option>
            <option value="Safety">Safety</option>
          </select>
        </label>

        <label>
          Urgency Level
          <select id="urgencyLevel" value={reportDetails.urgencyLevel} onChange={handleChange} required>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>

        <label>
          Report Details
          <textarea
            id="reportText"
            value={reportDetails.reportText}
            onChange={handleChange}
            placeholder="Describe the issue..."
            rows="5"
            required
          ></textarea>
        </label>

        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
};

export default WriteReport;
