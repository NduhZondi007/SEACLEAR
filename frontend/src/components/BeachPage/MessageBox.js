import React from 'react';
import axios from 'axios';
import { Filter } from 'bad-words';

class MessageBox extends React.Component {
    sendBtn = (event) => {
        const { messageBox: name, refreshConversation } = this.props;
        let message = document.getElementById("textBoxId").value;
        const filter = new Filter();
        if(filter.isProfane(message)){
            message = filter.clean(message);
        }
        axios.post("http://127.0.0.1:8000/beachSpecific-chat/", {
            "beach_name": name,
            "messages": [
                {
                    "sender": "Mnqobi",
                    "content": message
                }
            ]
        })
        .then(() => {
            document.getElementById("textBoxId").value = "";
            refreshConversation();
        })
        .catch((err) => {
            console.error('There was an error sending the message!', err);
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
