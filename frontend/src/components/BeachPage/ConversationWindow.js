import React, { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../UserContext';
import likeIcon from './../../assets/images/likeIcon.png';  // Import the like icon

class ConversationWindow extends React.Component {
    state = {
        details: null,  // Holds the chat details for a specific beach, including messages
        usernameTextArea: false,  // Show username input modal
        username: '',  // Username input value
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
        axios.get('http://localhost:8000/beachSpecific-chat/')
            .then((res) => {
                let data = res.data;
                data = data.find(beachChat => beachChat.beach_name === name);
                if (data && data.messages) {
                    data.messages.sort((a, b) => a.id - b.id);
                }
                this.setState({
                    details: data,
                });
            })
            .catch((err) => {
                console.error('There was an error fetching the data!', err);
            });
    };

    handleLike = (messageId) => {
        const { username } = this.context;  // Access the username from UserContext

        if (!username) {
            this.setState({ usernameTextArea: true });  // Show the modal if no username is set
        } else {
            axios.put(`http://localhost:8000/beachSpecific-chat/${messageId}/like/`, {
                username: username
            })
            .then(() => {
                // Re-fetch the messages to update the like count in the UI
                this.fetchMessages();
            })
            .catch((err) => {
                console.error('There was an error liking the message!', err);
            });
        }
    };

    handleUsernameSubmit = () => {
        const { setUsername } = this.context;
        const { username } = this.state;

        if (username.trim() !== "") {
            localStorage.setItem('username', username.trim()); // Save username to localStorage
            setUsername(username.trim());
            this.setState({ usernameTextArea: false });
        } else {
            alert("Username is required.");
        }
    };

    render() {
        const { details, usernameTextArea, username } = this.state;
        const { username: contextUsername } = this.context;  // Access the username from UserContext

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
                                    style={message.sender === contextUsername ? styles.userMessage : styles.otherMessage}
                                >
                                    <strong>{message.sender}:</strong> {message.content}
                                    {contextUsername && message.sender === contextUsername && (
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

                {usernameTextArea && (
                    <div style={styles.modal}>
                        <div style={styles.modalContent}>
                            <label style={styles.label}>
                                Enter Your Username
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => this.setState({ username: e.target.value })}
                                    placeholder="Username"
                                    style={styles.modalInput}
                                />
                            </label>
                            <div style={styles.modalButtons}>
                                <button onClick={this.handleUsernameSubmit} style={styles.modalSubmitButton}>Submit</button>
                                <button onClick={() => this.setState({ usernameTextArea: false })} style={styles.modalCancelButton}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
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
    modal: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
        textAlign: 'center',
        width: '300px',
    },
    label: {
        fontSize: '1.2rem',
        marginBottom: '10px',
        display: 'block',
    },
    modalInput: {
        width: '100%',
        padding: '10px',
        fontSize: '1rem',
        borderRadius: '5px',
        border: '1px solid #ccc',
        outline: 'none',
        marginBottom: '10px',
    },
    modalButtons: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    modalSubmitButton: {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
    },
    modalCancelButton: {
        backgroundColor: '#dc3545',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
    },
};

export default ConversationWindow;
