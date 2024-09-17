import React from 'react';
import { useNavigate } from 'react-router-dom';
import adminIcon from './../../assets/images/adminIcon.png'; // Direct import for cleaner code

const LoginIcon = () => {
  const navigate = useNavigate();

  // Navigate to the login page when the icon is clicked
  const handleMapClick = () => {
    navigate(`/adminpageLogin`);
  };

  return (
    <button 
      id="adminIcon" 
      onClick={handleMapClick} 
      style={styles.button}
    >
      <img 
        src={adminIcon} 
        alt="Admin Login Icon" 
        style={styles.image} 
        onError={(e) => e.target.src = 'fallbackImagePath.png'} // Optional fallback in case the image fails to load
      />
    </button>
  );
};

// Styling for the button and image
const styles = {
  button: {
    backgroundColor: 'transparent', // Transparent background to only show the image
    border: 'none',  // Remove default button border
    padding: '10px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease', // Add smooth scale animation on hover
  },
  image: {
    width: '50px', // Adjust size of the icon
    height: '50px',
  },
};

export default LoginIcon;
