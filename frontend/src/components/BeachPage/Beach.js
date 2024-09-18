import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Weather from './Weather';  // Importing a Weather component
import Amenities from './Amenities';  // Importing an Amenities component
import MessageBox from './MessageBox';  // Importing a MessageBox component for sending messages
import ConversationWindow from './ConversationWindow';  // Importing a ConversationWindow component to display messages
import MapIcon from '../MapPage/MapIcon';
import Navbar from '../Navbar/Navbar';

class Beach extends React.Component {
    state = {
        details: null,  // To store beach details after fetching from the server
        refreshConversation: false,  // Used to toggle refreshing of the ConversationWindow
    };

    componentDidMount() {
        axios
            .get('http://localhost:8000/beaches')
            .then((res) => {
                let data = res.data;
                data = data.find(beach => beach.name === this.props.params.name);
                this.setState({
                    details: data,
                });
            })
            .catch((err) => {
                console.error('There was an error fetching the data!', err);
            });
    }

    refreshConversation = () => {
        this.setState((prevState) => ({
            refreshConversation: !prevState.refreshConversation
        }));
    };

    render() {
        const { details, refreshConversation } = this.state;
        const { navigate } = this.props;

        if (!details) {
            return <div style={styles.loading}>Loading beach details...</div>;
        }

        return (
            <div>
                <Navbar />
                <div style={styles.container}>
                    <header style={styles.header}>
                        <hr />
                        <p style={styles.beachName}>Name: {details.name}</p>
                        <p style={styles.location}>Location: {details.location}</p>
                        <p style={styles.safety}>Safety: {details.waterQuality.isSafe ? 'Safe' : 'Unsafe'}</p>

                        <Weather weather={details.weather} />
                        <Amenities amenities={details.amenities} />

                        <h3 style={styles.sectionTitle}>Messages</h3>
                        <ConversationWindow
                            conversationWindow={details.name}
                            key={refreshConversation}
                        />

                        <MessageBox
                            messageBox={details.name}
                            refreshConversation={this.refreshConversation}
                        />

                        <button style={styles.button} onClick={() => navigate('/writeReport')}>
                            Write Report
                        </button>
                        <MapIcon />
                    </header>
                </div>
            </div>
        );
    }
}


// Define inline styles
const styles = {
    container: {
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#f4f4f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        margin: '20px auto',
    },
    header: {
        padding: '20px',
        textAlign: 'left',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    beachName: {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        color: '#007BFF',
        marginBottom: '10px',
    },
    location: {
        fontSize: '1.2rem',
        color: '#6c757d',
        marginBottom: '10px',
    },
    safety: {
        fontSize: '1rem',
        color: details => (details.waterQuality.isSafe ? '#28a745' : '#dc3545'),
        marginBottom: '20px',
    },
    sectionTitle: {
        fontSize: '1.5rem',
        marginTop: '20px',
        marginBottom: '10px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '1rem',
        cursor: 'pointer',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#007BFF',
        color: '#fff',
        transition: 'background-color 0.3s ease',
    },
    loading: {
        textAlign: 'center',
        fontSize: '1.5rem',
        color: '#6c757d',
        marginTop: '50px',
    },
};

styles.button[':hover'] = {
    backgroundColor: '#0056b3',
};


// A wrapper function to use hooks (useParams, useNavigate) in class-based components
function BeachWithParamsAndNavigate(props) {
    const params = useParams();  // Hook to access URL parameters
    const navigate = useNavigate();  // Hook to allow navigation
    return <Beach {...props} params={params} navigate={navigate} />;  // Pass the hooks as props to the class-based component
}

export default BeachWithParamsAndNavigate;  // Export the component
