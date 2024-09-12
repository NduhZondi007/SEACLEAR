// src/components/MessageBox.js
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Filter } from 'bad-words';
import { UserContext } from '../../UserContext';

const MessageBox = (props) => {
    const { username, setUsername } = useContext(UserContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [inputUsername, setInputUsername] = useState('');

    const sendBtn = () => {
        const { messageBox: name, refreshConversation } = props;
        let message = document.getElementById("textBoxId").value;

        const filter = new Filter();
        if (filter.isProfane(message)) {
            message = filter.clean(message);
        }

        if (!username) {
            setModalVisible(true); // Show modal if username is not set
        } else {
            sendMessage(name, message, refreshConversation);
        }
    };

    const handleUsernameSubmit = () => {
        if (inputUsername.trim() !== "") {
            localStorage.setItem('username', inputUsername.trim()); // Save username to localStorage
            setUsername(inputUsername.trim());
            setModalVisible(false);
        } else {
            alert("Username is required.");
        }
    };

    const sendMessage = (name, message, refreshConversation) => {
        axios.post("http://127.0.0.1:8000/beachSpecific-chat/", {
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
        <div>
            <input id="textBoxId" />
            <button onClick={sendBtn}>Submit</button>

            {modalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <label>
                            Enter Your Username
                            <input
                                type="text"
                                value={inputUsername}
                                onChange={(e) => setInputUsername(e.target.value)}
                                placeholder="Username"
                            />
                            <button onClick={handleUsernameSubmit}>Submit</button>
                            <button onClick={() => setModalVisible(false)}>Cancel</button>
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MessageBox;
