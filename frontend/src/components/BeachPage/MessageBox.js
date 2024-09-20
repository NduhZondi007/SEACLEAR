import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Filter } from 'bad-words';
import { UserContext } from '../../UserContext';
import './MessageBox.css';  // Import the new CSS file for styling

const MessageBox = (props) => {
    const { username, setUsername } = useContext(UserContext);
    const [usernameTextArea, setUsernameTextAreaVisibility] = useState(false);
    const [inputUsername, setInputUsername] = useState('');

    const sendBtn = () => {
        const { messageBox: name, refreshConversation } = props;
        let message = document.getElementById("textBoxId").value;

        const filter = new Filter();
        if (filter.isProfane(message)) {
            message = filter.clean(message);
        }

        if (!username) {
            setUsernameTextAreaVisibility(true); // Show modal if username is not set
        } else {
            sendMessage(name, message, refreshConversation);
        }
    };

    const handleUsernameSubmit = () => {
        if (inputUsername.trim() !== "") {
            localStorage.setItem('username', inputUsername.trim());
            setUsername(inputUsername.trim());
            setUsernameTextAreaVisibility(false);
        } else {
            alert("Username is required.");
        }
    };

    const sendMessage = (name, message, refreshConversation) => {
        if (message === "") {
            return;
        }
        axios.post("https://seaclear-8.cs.uct.ac.za/api/beachSpecific-chat/", {
            "beach_name": name,
            "messages": [
                {
                    "sender": username,
                    "content": message
                }
            ]
        })
        .then(() => {
            document.getElementById("textBoxId").value = "";
            refreshConversation();
        })
        .catch((err) => {
            console.error('Error sending message!', err);
        });
    };

    return (
        <div className="message-box-container">
            <input id="textBoxId" className="message-input" placeholder="Type your message here..." />
            <button onClick={sendBtn} className="send-button">Send</button>

            {usernameTextArea && (
                <div className="modal">
                    <div className="modal-content">
                        <label className="modal-label">
                            Enter Your Username
                            <input
                                type="text"
                                value={inputUsername}
                                onChange={(e) => setInputUsername(e.target.value)}
                                placeholder="Username"
                                className="modal-input"
                            />
                        </label>
                        <div className="modal-buttons">
                            <button onClick={handleUsernameSubmit} className="modal-submit-button">Sumbit</button>
                            <button onClick={() => setUsernameTextAreaVisibility(false)} className="modal-cancel-button">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MessageBox;
