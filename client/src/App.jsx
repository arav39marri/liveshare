import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RoomPage from './pages/RoomPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/room/:roomId" element={<RoomPage />} />
      
      {/* Placeholder routes for AdSense requirement */}
      <Route path="/privacy-policy" element={<div className="p-10 text-white font-body">Privacy Policy Content</div>} />
      <Route path="/terms" element={<div className="p-10 text-white font-body">Terms & Conditions Content</div>} />
      <Route path="/about" element={<div className="p-10 text-white font-body">About FileShare</div>} />
    </Routes>
  );
}

export default App;
