import React from 'react';
import MessageBox from './MessageBox';
import ConversationWindow from './ConversationWindow';
import chatIcon from './../../assets/images/chatIcon.png';  // Import the chat icon image

class Chat extends React.Component {
    state = {
        refreshConversation: false,
        showChat: false,  // State to track whether the chat is displayed
    };

    // Function to toggle chat visibility
    toggleChat = () => {
        this.setState((prevState) => ({
            showChat: !prevState.showChat,
        }));
    };

    refreshConversation = () => {
        this.setState((prevState) => ({
            refreshConversation: !prevState.refreshConversation,
        }));
    };

    render() {
        const { beachName } = this.props;  // Access the beachName passed as prop
        const { refreshConversation, showChat } = this.state;

        return (
            <div>
                {!showChat ? (
                    // Display the button with the chat icon when chat is hidden
                    <button style={styles.iconButton} onClick={this.toggleChat}>
                        <img src={chatIcon} alt="Chat" style={styles.icon} />
                    </button>
                ) : (
                    // Display the chat components when chat is visible
                    <div style={styles.chatContainer}>
                        <button style={styles.closeButton} onClick={this.toggleChat}>
                            Close Chat
                        </button>
                        <ConversationWindow
                            conversationWindow={beachName}
                            key={refreshConversation}
                        />
                        <MessageBox
                            messageBox={beachName}
                            refreshConversation={this.refreshConversation}
                        />
                    </div>
                )}
            </div>
        );
    }
}

// Add the styling directly into the Chat component
const styles = {
    chatContainer: {
        border: '1px solid #ccc',  // Optional: Add border for visual separation
        borderRadius: '8px',
        padding: '10px',
        margin: '20px 0',
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#fff',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    },
    iconButton: {
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
    },
    icon: {
        width: '50px',  // Adjust size of the chat icon
        height: '50px',
    },
    closeButton: {
        display: 'block',
        marginLeft: 'auto',
        padding: '5px 10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginBottom: '10px',
    },
};

export default Chat;
