import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar/Navbar';

const AdminPage = () => {
  // Initialize the navigate function
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      
      <main style={styles.container}>
        <h1 style={styles.title}>Admin Page</h1>
        
        <div style={styles.buttonGroup}>
          {/* Button to navigate to the "Add Beach" page */}
          <button style={styles.button} onClick={() => navigate('/admin/addBeach')}>
            Add Beach
          </button>
          
          {/* Button to navigate to the "Update Beach" page */}
          <button style={styles.button} onClick={() => navigate('/admin/updateBeach')}>
            Update Beach
          </button>
          
          {/* Button to navigate to the "View Reports" page */}
          <button style={styles.button} onClick={() => navigate('/admin/report')}>
            View Reports
          </button>
        </div>
      </main>
    </div>
  );
};

// Define some basic inline styles to enhance the layout
const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
    transition: 'background-color 0.3s ease',
  },
};

// Add hover effect using React's inline style approach
styles.button[':hover'] = {
  backgroundColor: '#0056b3',
};

export default AdminPage;
