import React from 'react';

import HomePage from './components/HomePage/Home.js';
import Map from './components/MapPage/Map.js';
import AdminPage from './components/AdminPage/AdminPage.js'

// Main App component
class App extends React.Component {

  render() {
    return (
      <div>
        <HomePage/>
      </div>
    );
  }
}

// Main entry point for routing
export default App;
