import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import CountUpSection from './CountUpSection';
import TrendingBeaches from './TrendingBeaches';
import MapIcon from '../MapPage/MapIcon';
import WriteReport from '../ReportPage/WriteReport'
import LoginIcon from '../AdminPage/LoginIcon';

class HomePage extends React.Component {

  render() {
    return (
      <div>
        <Navbar />
        <HeroSection />
        <CountUpSection/>
        <TrendingBeaches/>
        <LoginIcon/>
        <MapIcon/>
      </div>
    );
  }
}

export default HomePage;
