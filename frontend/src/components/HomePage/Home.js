import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import HeroSection from './HeroSection';
import CountUpSection from './CountUpSection';
import TrendingBeaches from './TrendingBeaches';
import MapIcon from '../MapPage/MapIcon';
import Footer from '../Footer/Footer';
import './SearchBar.css'; // Create this CSS file for custom styles

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Navbar />
      <HeroSection />
      <div className="search-container">
        <div className="search-box">
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search for a beach..." 
            value={searchQuery} 
            onChange={(e) => handleSearch(e.target.value)} 
          />
          <button className="search-button">
            <i className="fas fa-search"></i> {/* FontAwesome search icon */}
          </button>
        </div>
      </div>
      <TrendingBeaches searchQuery={searchQuery} />
      <CountUpSection />
      <MapIcon />
      <Footer/>
    </>
  );
};

export default HomePage;
