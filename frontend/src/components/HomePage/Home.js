import React from 'react';
import Navbar from '../Navbar/Navbar';
import HeroSection from './HeroSection';
import CountUpSection from './CountUpSection';
import TrendingBeaches from './TrendingBeaches';
import MapIcon from '../MapPage/MapIcon';
import Footer from '../Footer/Footer';

class HomePage extends React.Component {

  render() {
    return (
      <>
        <Navbar />
        <HeroSection />
        <TrendingBeaches />
        <CountUpSection />
        <MapIcon />
        <Footer/>
      </>
    );
  }
}

export default HomePage;
