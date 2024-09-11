import React from 'react';
import axios from 'axios';

class ConversationWindow extends React.Component {
    state = {
        details: null,  // Holds the chat details for a specific beach, including messages
    };

    // Lifecycle method: fetches messages when the component is first mounted
    componentDidMount() {
        this.fetchMessages();  // Call the function to fetch the messages
    }

    // Lifecycle method: fetches messages when there is a change in the conversationWindow prop (beach name)
    componentDidUpdate(prevProps) {
        // Check if the conversationWindow prop has changed before re-fetching messages
        if (prevProps.conversationWindow !== this.props.conversationWindow) {
            this.fetchMessages();  // Fetch new messages if the beach name changes
        }
    }

    // Function to fetch messages from the backend API
    fetchMessages = () => {
        const { conversationWindow: name } = this.props;  // Extract the beach name from props
        axios.get('http://localhost:8000/beachSpecific-chat/')  // Make an API request to get beach-specific chats
            .then((res) => {
                let data = res.data;  // Get the response data
                // Find the chat specific to the current beach (based on beach name)
                data = data.find(beachChat => beachChat.beach_name === name);  
                this.setState({
                    details: data,  // Update the state with the chat details
                });
            })
            .catch((err) => {
                console.error('There was an error fetching the data!', err);  // Log any errors that occur during data fetching
            });
    };

    // Render method to display the component UI
    render() {
        const { details } = this.state;  // Destructure the details from state
    
        // Display a loading message if the chat details or messages are not yet loaded
        if (!details || !details.messages) { 
            return <div>Loading Messages details...</div>;
        }
    
        return (
            <div>
                <header>
                    {/* Check if there are any messages in the chat and display them */}
                    {details.messages.length > 0 ? (
                        // Map through the messages array and display each message
                        details.messages.map((message, index) => (
                            <div key={index}>
                                <strong>{message.sender}:</strong> {message.content}
                            </div>
                        ))
                    ) : (
                        // If there are no messages, display a placeholder text
                        <p>No messages yet.</p>
                    )}
                </header>
            </div>
        );
    }
}

export default ConversationWindow;  // Export the component for use in other parts of the application
