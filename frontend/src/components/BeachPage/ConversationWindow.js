import React, { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../UserContext';
import likeIcon from './../../assets/images/likeIcon.png';  // Import the like icon

class ConversationWindow extends React.Component {
    state = {
        details: null,  // Holds the chat details for a specific beach, including messages
    };

    static contextType = UserContext;  // Declare the contextType to access UserContext in class components

    componentDidMount() {
        this.fetchMessages();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.conversationWindow !== this.props.conversationWindow) {
            this.fetchMessages();
        }
    }

    fetchMessages = () => {
        const { conversationWindow: name } = this.props;
        axios.get('https://seaclear-8.cs.uct.ac.za/api/beachSpecific-chat/')
            .then((res) => {
                let data = res.data;
                data = data.find(beachChat => beachChat.beach_name === name);
                this.setState({
                    details: data,
                });
            })
            .catch((err) => {
                console.error('There was an error fetching the data!', err);
            });
    };

    handleLike = (messageId) => {
        // Assuming the API endpoint is something like 'beachSpecific-chat/:messageId/like/'
        axios.put(`https://seaclear-8.cs.uct.ac.za/api/beachSpecific-chat/${messageId}/like/`)
            .then(() => {
                // Re-fetch the messages to update the like count in the UI
                this.fetchMessages();
            })
            .catch((err) => {
                console.error('There was an error liking the message!', err);
            });
    };

    render() {
        const { details } = this.state;
        const { username } = this.context;  // Access the username from UserContext

        if (!details || !details.messages) {
            return <div style={styles.loading}>Loading Messages details...</div>;
        }

        return (
            <div style={styles.container}>
                <header style={styles.header}>
                    <div style={styles.messageList}>
                        {details.messages.length > 0 ? (
                            details.messages.map((message, index) => (
                                <div
                                    key={index}
                                    style={message.sender === username ? styles.userMessage : styles.otherMessage}
                                >
                                    <strong>{message.sender}:</strong> {message.content}
                                    {username && message.sender === username && (
                                        <span style={styles.youTag}> (You)</span>
                                    )}
                                    <div style={styles.likeContainer}>
                                        <img
                                            src={likeIcon}
                                            alt="Like"
                                            style={styles.likeIcon}
                                            onClick={() => this.handleLike(message.id)}  // Like button
                                        />
                                        <span>{message.likeCount} likes</span>  {/* Display like count */}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No messages yet.</p>
                        )}
                    </div>
                </header>
            </div>
        );
    }
}

// Define inline styles
const styles = {
    container: {
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto',
    },
    header: {
        paddingBottom: '10px',
        borderBottom: '1px solid #ccc',
    },
    messageList: {
        maxHeight: '400px',
        overflowY: 'auto',
        paddingRight: '10px',
    },
    userMessage: {
        backgroundColor: '#daf1da',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '10px',
        textAlign: 'right',
        color: '#333',
        fontSize: '1rem',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    },
    otherMessage: {
        backgroundColor: '#f1f1f1',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '10px',
        textAlign: 'left',
        color: '#333',
        fontSize: '1rem',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    },
    youTag: {
        fontStyle: 'italic',
        color: '#555',
        marginLeft: '5px',
    },
    likeContainer: {
        marginTop: '5px',
        display: 'flex',
        alignItems: 'center',
    },
    likeIcon: {
        width: '20px',
        height: '20px',
        cursor: 'pointer',
        marginRight: '5px',
    },
    loading: {
        textAlign: 'center',
        padding: '20px',
        fontSize: '1.2rem',
    },
};

export default ConversationWindow;
