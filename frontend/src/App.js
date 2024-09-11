import React from 'react';

import HomePage from './components/HomePage/Home.js';
import Map from './components/MapPage/Map.js';

// Main App component
class App extends React.Component {

  render() {
    return (
      <div>
        <Map />
      </div>
    );
  }
}

// Main entry point for routing
export default App;
