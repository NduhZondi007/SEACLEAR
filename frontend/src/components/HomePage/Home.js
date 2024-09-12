import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import BeachList from '../AdminPage/BeachList';
import MapIcon from '../MapPage/MapIcon';

class HomePage extends React.Component {

  render() {
    return (
      <div>
        <Navbar />
        <HeroSection />
        <BeachList/>
        <MapIcon/>
      </div>
    );
  }
}

export default HomePage;
