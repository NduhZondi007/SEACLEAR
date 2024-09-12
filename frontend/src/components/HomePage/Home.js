import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import BeachListHome from './BeachListHome';
import CountUpSection from './CountUpSection';
import MapIcon from '../MapPage/MapIcon';

class HomePage extends React.Component {

  render() {
    return (
      <div>
        <Navbar />
        <HeroSection />
        <CountUpSection/>
        <BeachListHome/>
        <MapIcon/>
      </div>
    );
  }
}

export default HomePage;
