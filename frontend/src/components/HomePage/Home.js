import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import HeroSection from './HeroSection';
import CountUpSection from './CountUpSection';
import TrendingBeaches from './TrendingBeaches';
import MapIcon from '../MapPage/MapIcon';
import Footer from '../Footer/Footer';
import './SearchBar.css'; // Create this CSS file for custom styles
import Chat from '../BeachPage/Chat';
import CsvUploader from '../AdminPage/CsvUploader';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <CsvUploader/>
    </>
  );
};

export default HomePage;
