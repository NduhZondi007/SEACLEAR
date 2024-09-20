import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import Cookies from 'js-cookie';
import './AdminPage.css'; // Import the CSS file
import Footer from '../Footer/Footer';

const AdminPage = () => {
  // Initialize the navigate function
  const navigate = useNavigate();

  const handleLogout = () => {
    const csrfToken = Cookies.get('csrftoken');  // Retrieve CSRF token
  
    axios.post('https://seaclear-8.cs.uct.ac.za/api/adminLogout/', {}, {
      headers: {
        'X-CSRFToken': csrfToken,  // Include CSRF token
      },
      withCredentials: true,  // Ensure cookies are sent with the request
    })
    .then(response => {
      if (response.status === 200) {
        navigate('/');  // Redirect to home page
      }
    })
    .catch(error => {
      console.error("Logout error:", error);
      navigate('/'); 
    });
  };


  return (
    <>
    <div>
      <Navbar />

      <main className="admin-container">
        <h1 className="title">Admin Page</h1>

        <div className="button-group">
          {/* Button to navigate to the "Add Beach" page */}
          <button className="button" onClick={() => navigate('/admin/addBeach')}>
            Add Beach
          </button>

          {/* Button to navigate to the "Update Beach" page */}
          <button className="button" onClick={() => navigate('/admin/updateBeach')}>
            Update Beach
          </button>

          {/* Button to navigate to the "View Reports" page */}
          <button className="button" onClick={() => navigate('/admin/report')}>
            View Reports
          </button>
          <button className="button" onClick={handleLogout}>Logout</button>
        </div>
      </main>
     
    </div>
    </>
  );
};

export default AdminPage;
