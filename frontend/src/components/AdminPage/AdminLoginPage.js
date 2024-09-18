import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import './AdminLoginPage.css'; // Import the CSS file

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
    <div className="admin-body">
      <Navbar />
      <div className="form-container">
        <h2 className="title">Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <input
              type="text"
              placeholder='Enter admin username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder='Enter password'

              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="button">Login</button>
        </form>
        {adminData && (
          <div className="admin-info">
            <h3>Admin Info</h3>
            <p>Username: {adminData.user.username}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
