import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './AdminPage.css'; // Import the CSS file
import Footer from '../Footer/Footer';

const AdminPage = () => {
  // Initialize the navigate function
  const navigate = useNavigate();

  return (
    <>
    <div>
      <Navbar />

      <main className="container">
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
        </div>
      </main>
     
    </div>
   <Footer/>
    </>
  );
};

export default AdminPage;
