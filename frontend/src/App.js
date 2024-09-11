import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

import AdminPage from './components/AdminPage/AdminPage.js';
import Beach from './components/BeachPage/Beach.js';
import AddBeach from './components/AdminPage/AddBeach.js';
import UpdateBeach from './components/AdminPage/UpdateBeach.js';
import WriteReport from './components/ReportPage/WriteReport.js';
import BeachList from './components/AdminPage/BeachList.js';
import HeroSection from './components/HomePage/HeroSection.js';
import Navbar from './components/HomePage/Navbar.js';

// Main App component
class App extends React.Component {
  state = {
    details: [], // Holds the list of beaches fetched from the backend
  };

  // Handler function to navigate to a specific beach page
  handleBeachClick = (name) => {
    this.props.navigate(`/beach/${name}`);
  }

  // Fetches beach data from the backend when the component mounts
  componentDidMount() {
    axios
      .get('http://localhost:8000/beaches')
      .then((res) => {
        const data = res.data; // Response data from the backend
        this.setState({
          details: data,
        });
      })
      .catch((err) => {
        console.error('There was an error fetching the data!', err);
      });
  }

  // Renders the App component
  render() {
    return (
      <div>
        <Navbar />
        <HeroSection />
        {<>
        <header>
          Data from backend
          <hr />
          {/* Displays the list of beaches */}
          {this.state.details.map((output, id) => (
            <div key={id}>
              <div>
                <p>Name: {output.name}</p>
                <p>Latitude: {output.location}</p>
                <hr />
              </div>
            </div>
          ))}
        </header>
        {/* Navigation buttons */}
        <button onClick={() => window.location.href = '/newpage'}>New page</button>
        <button onClick={() => window.location.href = '/adminpage'}>Admin</button>
        <button onClick={() => this.handleBeachClick("Camps Bay")}>Camps Bay</button>
        <button onClick={() => this.handleBeachClick("Strand Beach")}>Strand Beach</button></>}
      </div>
    );
  }
}

// Wrapper component to inject navigate prop
function AppWithNavigate(props) {
  const navigate = useNavigate();
  return <App {...props} navigate={navigate} />;
}

// Main entry point for routing
export default function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppWithNavigate />} /> {/* Main app route */}
        <Route path="/adminpage" element={<AdminPage />} /> {/* Admin page route */}
        <Route path="/admin/addBeach" element={<AddBeach />} /> {/* Add Beach route */}
        <Route path="/admin/updateBeach" element={<BeachList />} /> {/* Beach List route */}
        <Route path="/admin/updateBeach/:name" element={<UpdateBeach />} /> {/* Update Beach route */}
        <Route path="/beach/:name" element={<Beach />} /> {/* Beach detail route */}
        <Route path="/writeReport" element={<WriteReport />} /> {/* Write Report route */}
      </Routes>
    </Router>
  );
}
