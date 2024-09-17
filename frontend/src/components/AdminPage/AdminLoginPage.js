import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [adminData, setAdminData] = useState(null);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/adminLogin/', {
      username,
      password
    })
    .then(response => {
      if (response.status === 200) {
        setAdminData(response.data);  // Store admin data upon success
        navigate(`/adminpage/`);
      } else {
        setErrorMessage('Invalid credentials');
      }
    })
    .catch(error => {
      if (error.response && error.response.status === 401) {
        setErrorMessage('Invalid credentials');
      } else {
        setErrorMessage('An error occurred while logging in');
      }
    });
  };

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.title}>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label style={styles.label}>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div>
          <label style={styles.label}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
        <button type="submit" style={styles.button}>Login</button>
      </form>
      {adminData && (
        <div>
          <h3>Admin Info</h3>
          <p>Username: {adminData.user.username}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  formContainer: {
    padding: '30px',
    margin: '0 auto',
    maxWidth: '400px',
    textAlign: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#333',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  errorMessage: {
    color: 'red',
    marginBottom: '15px',
  },
};

styles.button[':hover'] = {
  backgroundColor: '#0056b3',
};


export default AdminLogin;
