import React from 'react';
<<<<<<< HEAD
import Navbar from '../Navbar';
import Footer from '../Footer';
=======
import Navbar from '../navbar/Navbar';
>>>>>>> 0b76e0e5b38944688a32512c4938ecfa6d6fa9cf
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
        <Footer/>
      </div>
    );
  }
}

export default HomePage;
