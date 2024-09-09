import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Weather from './Weather';
import Amenities from './Amenities';
import MessageBox from './MessageBox';
import ConversationWindow from './ConversationWindow';
import { useNavigate } from 'react-router-dom';

class Beach extends React.Component {
    state = {
        details: null,
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
        const { navigate } = this.props;

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

                    <button onClick={() => navigate('/writeReport')}>Write Report</button>

                </header>
            </div>
        );
    }
}


function BeachWithParamsAndNavigate(props) {
    const params = useParams();
    const navigate = useNavigate();
    return <Beach {...props} params={params} navigate={navigate} />;
}

export default BeachWithParamsAndNavigate;
