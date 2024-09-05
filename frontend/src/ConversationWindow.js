import React from 'react';
import axios from 'axios';

class ConversationWindow extends React.Component {
    state = {
        details: null, // Initialize with null to handle loading state
    };

    fetchMessages = (name) => {
        axios.get('http://localhost:8000/beachSpecific-chat/')
            .then((res) => {
                console.log("Response data:", res.data);
                let data = res.data.find(beachChat => beachChat.beach_name === name);
                console.log("Filtered data:", data);
                this.setState({
                    details: data,
                });
            })
            .catch((err) => {
                console.error('There was an error fetching the data!', err);
            });
    };

    componentDidMount() {
        const { conversationWindow: name } = this.props;
        if (name) {
            this.fetchMessages(name);
        }
    }

    componentDidUpdate(prevProps) {
        const { conversationWindow: prevName } = prevProps;
        const { conversationWindow: currentName } = this.props;
        if (currentName !== prevName) {
            this.fetchMessages(currentName);
        }
    }

    render() {
        const { details } = this.state;

        if (!details) {
            return <div>Loading Messages details...</div>;
        }

        return (
            <div>
                <header>
                    {details.messages && details.messages.length > 0 ? (
                        details.messages.map((message, index) => (
                            <div key={index}>
                                <strong>{message.sender}:</strong> {message.content}
                            </div>
                        ))
                    ) : (
                        <p>No messages yet.</p>
                    )}
                </header>
            </div>
        );
    }
}

export default ConversationWindow;
