import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Weather from './Weather';
import Amenities from './Amenities';
import MessageBox from './MessageBox';
import ConversationWindow from './ConversationWindow';

class Beach extends React.Component {
    state = {
        details: [],
        refreshConversation: false,
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

        if (!details) {
            return <div>Loading beach details...</div>;
        }

        return (
            <div>
                <header>
                    <hr />
                    <p>Name: {details.name}</p>
                    <p>Location: {details.location}</p>
                    <Weather weather={details.weather} />
                    <Amenities amenities={details.amenities} />
                    <h3>Messages</h3>
                    <ConversationWindow
                        conversationWindow={details.name}
                        key={refreshConversation}
                    />
                    <MessageBox
                        messageBox={details.name}
                        refreshConversation={this.refreshConversation}
                    />
                </header>
            </div>
        );
    }
}

// Wrapper component to inject params
function BeachWithParams(props) {
    const params = useParams();
    return <Beach {...props} params={params} />;
}

export default BeachWithParams;
