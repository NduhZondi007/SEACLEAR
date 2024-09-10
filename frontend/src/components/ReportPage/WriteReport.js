import React, { useState, useEffect } from 'react';  // Importing React and hooks for state and lifecycle management
import axios from 'axios';  // Importing axios for making HTTP requests
import './WriteReport.css';  // Importing CSS for styling

const WriteReport = () => {
  // State for handling report details, initialized with default values
  const [reportDetails, setReportDetails] = useState({
    beachName: '',
    reportText: '',
    reportCategory: 'General',
    urgencyLevel: 'Low',
  });

  // State for handling fetched beach data
  const [beaches, setBeaches] = useState([]);
  // State for loading and error handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect hook to fetch beach data when the component mounts
  useEffect(() => {
    axios.get('http://localhost:8000/beaches')
      .then(response => {
        setBeaches(response.data);  // Set fetched beach data to state
        setLoading(false);  // Set loading to false after data is fetched
      })
      .catch(error => {
        setError('Error fetching beach data');  // Set error message if fetching fails
        setLoading(false);  // Set loading to false after error
      });
  }, []);  // Empty dependency array means this runs once after the initial render

  // Handler for input field changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setReportDetails(prevDetails => ({
      ...prevDetails,
      [id]: value
    }));
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8000/community-reports/', reportDetails)
      .then(response => {
        console.log('Report submitted successfully:', response.data);
        // Reset form fields to default values after successful submission
        setReportDetails({
          beachName: '',
          reportText: '',
          reportCategory: 'General',
          urgencyLevel: 'Low',
        });
      })
      .catch(error => {
        console.error('Error submitting the report:', error);
        setError('Failed to submit the report. Please try again.');  // Set error message if submission fails
      });
  };

  // Display loading message while fetching data
  if (loading) {
    return <p>Loading beaches...</p>;
  }

  return (
    <div className="report-container">
      <h2>Submit a Community Report</h2>
      {/* Display error messages if there's an error */}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="report-form">
        <label>
          Beach Name
          {/* Dropdown for selecting a beach */}
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
          {/* Dropdown for selecting the report category */}
          <select id="reportCategory" value={reportDetails.reportCategory} onChange={handleChange} required>
            <option value="General">General</option>
            <option value="Water Quality">Water Quality</option>
            <option value="Pollution">Pollution</option>
            <option value="Safety">Safety</option>
          </select>
        </label>

        <label>
          Urgency Level
          {/* Dropdown for selecting the urgency level */}
          <select id="urgencyLevel" value={reportDetails.urgencyLevel} onChange={handleChange} required>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>

        <label>
          Report Details
          {/* Textarea for entering report details */}
          <textarea
            id="reportText"
            value={reportDetails.reportText}
            onChange={handleChange}
            placeholder="Describe the issue..."
            rows="5"
            required
          ></textarea>
        </label>

        {/* Submit button for the form */}
        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
};

export default WriteReport;
