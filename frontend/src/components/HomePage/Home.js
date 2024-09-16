import React from 'react';
import Navbar from '../Navbar';
import HeroSection from './HeroSection';
import CountUpSection from './CountUpSection';
import TrendingBeaches from './TrendingBeaches';
import MapIcon from '../MapPage/MapIcon';
import WriteReport from '../ReportPage/WriteReport'

class HomePage extends React.Component {

  render() {
    return (
      <div>
        <Navbar />
        <HeroSection />
        <CountUpSection/>
        <TrendingBeaches/>
        <MapIcon/>
      </div>
    );
  }
}

export default HomePage;
