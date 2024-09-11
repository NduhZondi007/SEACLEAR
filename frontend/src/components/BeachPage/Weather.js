import React from 'react';
import axios from 'axios';
import { Filter } from 'bad-words';  // Import the bad-words filter to detect and filter out profanity

class MessageBox extends React.Component {
    // Function to handle the message sending when the button is clicked
    sendBtn = (event) => {
        const { messageBox: name, refreshConversation } = this.props;  // Destructure props for the beach name and refreshConversation function
        let message = document.getElementById("textBoxId").value;  // Get the message input value from the text box

        const filter = new Filter();  // Create an instance of the Filter to filter out profanity
        if(filter.isProfane(message)){  // Check if the input message contains profane language
            message = filter.clean(message);  // If profanity is detected, clean it (replace bad words with asterisks)
        }

        // Send a POST request to the backend to add the new message to the chat
        axios.post("http://127.0.0.1:8000/beachSpecific-chat/", {
            "beach_name": name,  // Include the beach name (from props) to identify the chat
            "messages": [
                {
                    "sender": "Mnqobi",  // Set the sender of the message (this could be dynamically set later)
                    "content": message   // Include the message content (filtered if necessary)
                }
            ]
        })
        .then(() => {
            document.getElementById("textBoxId").value = "";  // Clear the input field after successful message submission
            refreshConversation();  // Refresh the conversation window to display the new message
        })
        .catch((err) => {
            console.error('There was an error sending the message!', err);  // Handle any errors that occur during the API request
        });
    }

    // Render the input text box and the submit button
    render() {
        return (
            <div>
                <input id="textBoxId" />  {/* Input field for the user to type their message */}
                <button onClick={this.sendBtn}>Submit</button>  {/* Submit button triggers the sendBtn function */}
            </div>
        );
    }
}

export default MessageBox;  // Export the component for use in other parts of the application
