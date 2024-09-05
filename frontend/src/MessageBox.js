import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

class MessageBox extends React.Component {
    state = {
        details: [],
    };

    // Define sendBtn as an arrow function
    sendBtn = (event) => {
        const { messageBox: name } = this.props;  // Access the prop passed from Beach component
        console.log("beachnamee",name);
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
        .then(response => console.log(response))
        .catch(error => console.error(error));
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
