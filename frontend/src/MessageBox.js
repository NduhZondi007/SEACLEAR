import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConversationWindow from './ConversationWindow';

class MessageBox extends React.Component {
    state = {
        details: [],
    };

    sendBtn = (event) => {
        const { messageBox: name } = this.props;
        let message = document.getElementById("textBoxId").value;

        axios.post("http://127.0.0.1:8000/beachSpecific-chat/", {
            "beach_name": name,
            "messages": [
                {
                    "sender": "Mnqobi",
                    "content": message
                }
            ]
        })
        .catch((err) => {
            console.error('There was an error fetching the data!', err);
        });
    }

    render() {
        return (
            <div>
                <input id="textBoxId" />
                <button onClick={this.sendBtn}>Submit</button>
            </div>
        );
    }
}

export default MessageBox;
