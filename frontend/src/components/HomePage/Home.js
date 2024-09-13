import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import BeachList from '../AdminPage/BeachList';
import CountUpSection from './CountUpSection';
import TrendingBeaches from './TrendingBeaches';

class HomePage extends React.Component {

  render() {
    return (
      <div>
        <Navbar />
        <HeroSection />
        <CountUpSection />
        <BeachList />
        <TrendingBeaches />
      </div>
    );
  }
}

export default HomePage;
