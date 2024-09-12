import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import BeachList from '../AdminPage/BeachList';
import CountUpSection from './CountUpSection';
import MapIcon from '../MapPage/MapIcon';

class HomePage extends React.Component {

  render() {
    return (
      <div>
        <Navbar />
        <HeroSection />
        <CountUpSection/>
        <BeachList/>
        <MapIcon/>
      </div>
    );
  }
}

export default HomePage;
