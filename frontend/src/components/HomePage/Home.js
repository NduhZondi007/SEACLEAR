import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import BeachList from '../AdminPage/BeachList';

class HomePage extends React.Component {

  render() {
    return (
      <div>
        <Navbar />
        <HeroSection />
        <BeachList/>
      </div>
    );
  }
}

export default HomePage;
