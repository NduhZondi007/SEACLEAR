import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Admin Page</h1>
      <button onClick={() => navigate('/admin/addBeach')}>Add Beach</button>
    </div>
  );
}

export default AdminPage;
