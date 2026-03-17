import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import Footer from '../components/Footer';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleCreateRoom = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
      const url = `${baseUrl}/api/room/new`;
      console.log('Calling:', url);
      const response = await fetch(url, { method: 'POST' });
      console.log('Response status:', response.status);
      const body = await response.text();
      console.log('Response body:', body);
      if (!response.ok) {
        alert(`Server error ${response.status}: ${body}`);
        return;
      }
      const data = JSON.parse(body);
      if (data.roomId) {
        navigate(`/room/${data.roomId}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert(`Network error: ${error.message}. Is the backend running on http://localhost:5000?`);
    }
  };

  const handleJoinRoom = (roomId) => {
    if (roomId && roomId.trim()) {
      navigate(`/room/${roomId.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-white selection:bg-indigo-500/30">
      <Navbar />
      <main>
        <Hero onCreateRoom={handleCreateRoom} onJoinRoom={handleJoinRoom} />
        <HowItWorks />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
