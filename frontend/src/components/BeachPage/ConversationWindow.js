import React from 'react';
import axios from 'axios';

class ConversationWindow extends React.Component {
    state = {
        details: null,
    };

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
                this.setState({
                    details: data,
                });
            })
            .catch((err) => {
                console.error('There was an error fetching the data!', err);
            });
    };

    render() {
        const { details } = this.state;
    
        if (!details || !details.messages) { 
            return <div>Loading Messages details...</div>;
        }
    
        return (
            <div>
                <header>
                    {details.messages.length > 0 ? (
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
