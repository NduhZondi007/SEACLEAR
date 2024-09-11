import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Function to handle button click and send weather data to the server
let enterBtn = (event) => {
    // Retrieve values from input fields using their IDs
    let temp = document.getElementById("TempId").value;
    let windSpeed = document.getElementById("WindSpeeId").value;

    // Send a POST request to the server with the weather data
    let response = axios.post("http://127.0.0.1:8000/weather/", 
        {
            "temperature": temp,
            "windSpeed": windSpeed,
        }
    )

    // Log the response from the server to the console
    console.log(response);
}

// Class component for the message box
class MessageBox extends React.Component {
  state = {
    details: [], // State to hold details, currently unused
  };

  // Lifecycle method to perform actions after the component mounts
  componentDidMount() {
    // Currently empty; can be used for additional setup if needed
  }

  render() {
    return (
        <div>
            {/* Input field for temperature */}
            Temp
            <input id="TempId" />

            {/* Input field for wind speed */}
            WindSpeed
            <input id="WindSpeeId" />

            {/* Input field for humidity (not used in enterBtn) */}
            Humidity
            <input id="HumidityId" />

            {/* Input field for forecast (not used in enterBtn) */}
            Forecast
            <input id="ForcastId" />

            {/* Button to trigger the enterBtn function */}
            <button onClick={enterBtn}>Submit</button>
        </div>
      );
  }
}

export default MessageBox;
