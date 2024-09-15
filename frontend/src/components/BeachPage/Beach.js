import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Weather from './Weather';  // Importing a Weather component
import Amenities from './Amenities';  // Importing an Amenities component
import MessageBox from './MessageBox';  // Importing a MessageBox component for sending messages
import ConversationWindow from './ConversationWindow';  // Importing a ConversationWindow component to display messages
import { useNavigate } from 'react-router-dom';  // Importing a hook for navigation
import MapIcon from '../MapPage/MapIcon';

class Beach extends React.Component {
    state = {
        details: null,  // To store beach details after fetching from the server
        refreshConversation: false,  // Used to toggle refreshing of the ConversationWindow
    };

    // Lifecycle method: This runs when the component is mounted to the DOM
    componentDidMount() {
        // Fetching data from the backend API
        axios
            .get('https://seaclear-8.cs.uct.ac.za/api/beaches')
            .then((res) => {
                let data = res.data;  // Retrieve the data from the API response
                // Find the beach that matches the name passed in the URL params
                data = data.find(beach => beach.name === this.props.params.name);
                this.setState({
                    details: data,  // Update state with beach details
                });
            })
            .catch((err) => {
                console.error('There was an error fetching the data!', err);  // Log any errors during data fetching
            });
    }

    // Function to toggle the refreshConversation state, forcing the ConversationWindow to refresh
    refreshConversation = () => {
        this.setState((prevState) => ({
            refreshConversation: !prevState.refreshConversation
        }));
    };

    render() {
        const { details, refreshConversation } = this.state;  // Destructure state variables
        const { navigate } = this.props;  // Destructure the navigate prop

        // Display loading message if beach details are not yet loaded
        if (!details) {
            return <div>Loading beach details...</div>;
        }

        // Once details are loaded, render the information about the beach
        return (
            <div>
                <header>
                    <hr />
                    {/* Display beach name and location */}
                    <p>Name: {details.name}</p>
                    <p>Location: {details.location}</p>
                    <p>Safety : {details.waterQuality.isSafe}</p>

                    {/* Display weather details using the Weather component */}
                    <Weather weather={details.weather} />

                    {/* Display the list of amenities using the Amenities component */}
                    <Amenities amenities={details.amenities} />

                    <h3>Messages</h3>
                    {/* Display conversation window, passing the beach name as prop and refreshing on state change */}
                    <ConversationWindow
                        conversationWindow={details.name}
                        key={refreshConversation}  // The key forces the component to re-render when toggled
                    />

                    {/* Render the MessageBox component for sending messages */}
                    <MessageBox
                        messageBox={details.name}
                        refreshConversation={this.refreshConversation}  // Pass down function to refresh the conversation window
                    />

                    {/* Button to navigate to the "Write Report" page */}
                    <button onClick={() => navigate('/writeReport')}>Write Report</button>
                    <MapIcon/>

                </header>
            </div>
        );
    }
}

// A wrapper function to use hooks (useParams, useNavigate) in class-based components
function BeachWithParamsAndNavigate(props) {
    const params = useParams();  // Hook to access URL parameters
    const navigate = useNavigate();  // Hook to allow navigation
    return <Beach {...props} params={params} navigate={navigate} />;  // Pass the hooks as props to the class-based component
}

export default BeachWithParamsAndNavigate;  // Export the component
