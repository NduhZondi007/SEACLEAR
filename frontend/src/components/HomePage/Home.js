import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import BeachListHome from './BeachListHome';
import CountUpSection from './CountUpSection';
import TrendingBeaches from './TrendingBeaches';
import MapIcon from '../MapPage/MapIcon';

class HomePage extends React.Component {

  render() {
    return (
      <div>
        <Navbar />
        <HeroSection />
        <CountUpSection/>
        <BeachList/>
      </div>
    );
  }
}

export default HomePage;
