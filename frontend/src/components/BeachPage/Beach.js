import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Weather from './Weather';  // Importing a Weather component
import Amenities from './Amenities';  // Importing an Amenities component
import MapIcon from '../MapPage/MapIcon';
import Navbar from '../Navbar/Navbar';
import Chat from './Chat';  // Importing the Chat component
import "./Beach.css";
import Footer from '../Footer/Footer';

class Beach extends React.Component {
    state = {
        details: null,  // To store beach details after fetching from the server
    };

    componentDidMount() {
        axios
            .get('https://seaclear-8.cs.uct.ac.za/api/beaches')
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

    render() {
        const { details } = this.state;
        const { navigate } = this.props;

        if (!details) {
            return <div style={styles.loading}>Loading beach details...</div>;
        }

        return (
            <>
                <Navbar />
                <div className="dashboard-container">
                    <div className="beach-info-container">
                        <div className="beach-header">
                            <p className="beach-name">{details.name}</p>
                            <p className="beach-location">Location: {details.location}</p>
                            <p className="beach-safety">
                                {details.waterQuality.isSafe === "Safe" ? (
                                    <span className="safe">Safe to swim 🟢</span>
                                ) : details.waterQuality.isSafe === "medium" ? (
                                    <span className="partially-safe">Partially Safe to swim 🟡</span>
                                ) : (
                                    <span className="unsafe">Unsafe to Swim 🔴</span>
                                )}
                            </p>
                        </div>

                        <div className="side-container">
                            <Weather weather={details.weather} />
                            <Amenities amenities={details.amenities} />

                        </div>
                    </div>
                    <Chat beachName={details.name} />

                    {/* Side section for chat, weather, and amenities */}

                </div>
                <Footer />

            </>

        );
    }
}

// Define inline styles
const styles = {

    location: {
        fontSize: '1.2rem',
        color: '#6c757d',
        marginBottom: '10px',
    },

};


// A wrapper function to use hooks (useParams, useNavigate) in class-based components
function BeachWithParamsAndNavigate(props) {
    const params = useParams();  // Hook to access URL parameters
    const navigate = useNavigate();  // Hook to allow navigation
    return <Beach {...props} params={params} navigate={navigate} />;  // Pass the hooks as props to the class-based component
}

export default BeachWithParamsAndNavigate;
