import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Filter } from 'bad-words';
import { UserContext } from '../../UserContext';

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
            localStorage.setItem('username', inputUsername.trim()); // Save username to localStorage
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
        <div style={styles.container}>
            <input id="textBoxId" style={styles.input} placeholder="Type your message here..." />
            <button onClick={sendBtn} style={styles.sendButton}>Submit</button>

            {usernameTextArea && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                        <label style={styles.label}>
                            Enter Your Username
                            <input
                                type="text"
                                value={inputUsername}
                                onChange={(e) => setInputUsername(e.target.value)}
                                placeholder="Username"
                                style={styles.modalInput}
                            />
                        </label>
                        <div style={styles.modalButtons}>
                            <button onClick={handleUsernameSubmit} style={styles.modalSubmitButton}>Submit</button>
                            <button onClick={() => setUsernameTextAreaVisibility(false)} style={styles.modalCancelButton}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Define the styles for the MessageBox and modal
const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        gap: '10px',
    },
    input: {
        width: '60%',
        padding: '10px',
        fontSize: '1rem',
        borderRadius: '5px',
        border: '1px solid #ccc',
        outline: 'none',
        transition: 'border-color 0.3s ease',
    },
    sendButton: {
        padding: '10px 20px',
        fontSize: '1rem',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    sendButtonHover: {
        backgroundColor: '#218838',
    },
    modal: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
        textAlign: 'center',
        width: '300px',
    },
    label: {
        fontSize: '1.2rem',
        marginBottom: '10px',
        display: 'block',
    },
    modalInput: {
        width: '100%',
        padding: '10px',
        fontSize: '1rem',
        borderRadius: '5px',
        border: '1px solid #ccc',
        outline: 'none',
        marginBottom: '10px',
    },
    modalButtons: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    modalSubmitButton: {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
    },
    modalCancelButton: {
        backgroundColor: '#dc3545',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
    },
};

export default MessageBox;
