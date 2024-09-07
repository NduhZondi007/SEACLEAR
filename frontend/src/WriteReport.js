import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

class WriteReport extends React.Component {
  state = {
    details: [],
  };

  componentDidMount() {
  }

  render() {
    return (
        <div>
          <h1>  Report Wrintingh</h1>
          <p>This is a different page rendered by React Router.</p>
        </div>
      );
  }
}


export default WriteReport;
