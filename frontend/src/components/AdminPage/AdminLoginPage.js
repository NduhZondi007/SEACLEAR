import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminLoginPage.css'; // Import the CSS file

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [adminData, setAdminData] = useState(null);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('https://seaclear-8.cs.uct.ac.za/api/adminLogin/', {
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
    <div className="form-container">
      <h2 className="title">Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label className="label">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input"
          />
        </div>
        <div>
          <label className="label">Password:</label>
          <input
            type="password"
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
        <div>
          <h3>Admin Info</h3>
          <p>Username: {adminData.user.username}</p>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
