import React from 'react';
import Navbar from '../navbar/Navbar';
import HeroSection from './HeroSection';
import CountUpSection from './CountUpSection';
import TrendingBeaches from './TrendingBeaches';
import MapIcon from '../MapPage/MapIcon';

class HomePage extends React.Component {

  render() {
    return (
      <div>
        <Navbar />
        <HeroSection />
        <TrendingBeaches/>
        <CountUpSection/>
        <MapIcon/>
      </div>
    );
  }
}

export default HomePage;
