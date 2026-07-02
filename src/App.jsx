import React, { useState } from 'react';
import Navbar from './components/navbar/Navbar.jsx';
import LandingPage from "./pages/Landingpage/LandingPage.jsx";

// Inline placeholders for missing pages to prevent compilation errors
function DoctorsPage() {
  return (
    <div style={{ padding: '60px 20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2>🩺 Find Doctors & Specialists</h2>
      <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '8px' }}>Page 2 - Coming Soon</p>
    </div>
  );
}

function DashboardPage() {
  return (
    <div style={{ padding: '60px 20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2>📊 Patient Dashboard</h2>
      <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '8px' }}>Page 3 - Coming Soon</p>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const renderActivePage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentPage} />;
      case 'doctors':
        return <DoctorsPage />;
      case 'dashboard':
        return <DashboardPage />;
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="app-wrapper">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main>
        {renderActivePage()}
      </main>
    </div>
  );
}