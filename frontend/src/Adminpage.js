import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


let enterBtn = (event) => {
    let temp = document.getElementById("TempId").value;
    let windSpeed = document.getElementById("WindSpeeId").value;
    let humidity = document.getElementById("HumidityId").value;
    let forcast = document.getElementById("ForcastId").value;

    let reponse = axios.post("http://127.0.0.1:8000/weather/", 
        {
            "temperature": temp,
            "windSpeed" : windSpeed,
            "humidity": humidity,
            "forecast": forcast
        }
    )
}

class Adminpage extends React.Component {
  state = {
    details: [],
  };

  componentDidMount() {
  }

  render() {
    return (
        <div>
            Temp
            <input id="TempId"></input>
            WindSpeed
            <input id="WindSpeeId"></input>
            Humidity
            <input id="HumidityId"></input>
            Forcast
            <input id="ForcastId"></input>
            <button onClick={enterBtn}>Submit</button>
        </div>
      );
  }
}


export default Adminpage;
