import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook from react-router-dom for navigation

function AdminPage() {
  // Create a navigate function using the useNavigate hook to programmatically navigate between routes
  const navigate = useNavigate();

  return (
    <div>
      <h1>Admin Page</h1> {/* Title of the Admin Page */}
      
      {/* Button to navigate to the "Add Beach" page when clicked */}
      <button onClick={() => navigate('/admin/addBeach')}>Add Beach</button>
      
      {/* Button to navigate to the "Update Beach" page when clicked */}
      <button onClick={() => navigate('/admin/updateBeach')}>Update Beach</button>
    </div>
  );
}

export default AdminPage;
