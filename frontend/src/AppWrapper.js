import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App'; // Import the main App component

import AdminPage from './components/AdminPage/AdminPage.js';
import Beach from './components/BeachPage/Beach.js';
import AddBeach from './components/AdminPage/AddBeach.js';
import UpdateBeach from './components/AdminPage/UpdateBeach.js';
import WriteReport from './components/ReportPage/WriteReport.js';
import BeachList from './components/AdminPage/BeachList.js';
import ReportList from './components/AdminPage/ReportList.js';
import ViewReport from './components/AdminPage/ViewReport.js';
import Map from './components/MapPage/Map.js';

// Main entry point for routing
export default function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} /> {/* Main app route */}
        <Route path="/adminpage" element={<AdminPage />} /> {/* Admin page route */}
        <Route path="/admin/addBeach" element={<AddBeach />} /> {/* Add Beach route */}
        <Route path="/admin/updateBeach" element={<BeachList />} /> {/* Beach List route */}
        <Route path="/admin/updateBeach/:name" element={<UpdateBeach />} /> {/* Update Beach route */}
        <Route path="/admin/report" element={<ReportList />} /> {/* Report List route */}
        <Route path="/admin/report/:reportId" element={<ViewReport />} /> {/* View Report route */}
        <Route path="/beach/:name" element={<Beach />} /> {/* Beach detail route */}
        <Route path="/writeReport" element={<WriteReport />} /> {/* Write Report route */}
        <Route path="/map" element={<Map />} /> {/* View Map */}
      </Routes>
    </Router>
  );
}
