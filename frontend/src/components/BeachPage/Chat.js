import React from 'react';
import MessageBox from './MessageBox';
import ConversationWindow from './ConversationWindow';
import chatIcon from './../../assets/images/chatIcon.png';  // Import the chat icon image
import './Chat.css';  // Import the external CSS file

class Chat extends React.Component {
    state = {
        refreshConversation: false,
        showChat: true,  // State to track whether the chat is displayed
    };

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
        const { beachName = 'General' } = this.props;
        const { refreshConversation, showChat } = this.state;

        return (
            <div>
                {!showChat ? (
                    <button className="icon-button" onClick={this.toggleChat}>
                        <img src={chatIcon} alt="Chat" className="chat-icon" />
                    </button>
                ) : (
                    <div className="chat-container">
                        <button className="close-button" onClick={this.toggleChat}>
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

export default Chat;
