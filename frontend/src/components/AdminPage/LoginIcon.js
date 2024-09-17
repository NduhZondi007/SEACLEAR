import React from 'react';
import { useNavigate } from 'react-router-dom';

const createIconPath = () => {
    return require(`./../../assets/images/mapIcon.png`);
};

const LoginIcon = () => {
    const navigate = useNavigate();
    
    const handleMapClick = () => {
        navigate(`/adminpageLogin`);
    };

    return (
        <button id='adminIcon' onClick={handleMapClick}>
            <img src={createIconPath()}/>
        </button>
    );
};

export default LoginIcon;
