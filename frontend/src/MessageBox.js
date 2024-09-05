import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


let sendBtn = (event) => {
    let message = document.getElementById("textBoxId").value;

    let reponse = axios.post("http://127.0.0.1:8000/beachSpecific-chat/",
        {
            "beach_name": "camps bay",
            "messages": [
                {
                    "sender": "Mnqobi",
                    "content": message
                }
            ]
        }
    )

    console.log(reponse);


}

class MessageBox extends React.Component {
    state = {
        details: [],
    };

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <input id="textBoxId"></input>
                <button onClick={sendBtn}>Submit</button>
            </div>
        );
    }
}


export default MessageBox;
