import React from 'react';

const Footer = () => {
    const footerStyle = {
        backgroundColor: '#f1f1f1',
        padding: '20px',
        textAlign: 'center',
        fontSize: '14px',
        color: '#333',
        borderTop: '1px solid #ddd',
        position: 'relative',
        bottom: '0',
        width: '100%',
    };

    const linkStyle = {
        color: '#007bff',
        textDecoration: 'none',
    };

    return (
        <footer style={footerStyle}>
            <p><strong>SeaClear Project</strong> | Providing real-time water quality information for local beaches in Cape Town.</p>
            <p>Powered by data from the City of Cape Town.</p>
            <p>© 2024 SeaClear. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
