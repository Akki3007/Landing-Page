import React, { useState, useCallback } from 'react';
import Navbar from './components/navbar/Navbar';
import LandingPage from './pages/Landingpage/LandingPage';
import DoctorsPage from './pages/Doctorspage/DoctorsPage'; 
import DashboardPage from './pages/Dashboardpage/DashboardPage';
import './index.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [appointments, setAppointments] = useState([]);

  // Navigate helper to scroll top
  const handleNavigate = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Helper to pass data from Doctors -> Dashboard
  const handleAddAppointment = useCallback((newAppointment) => {
    setAppointments((prev) => [...prev, newAppointment]);
  }, []);

  return (
    <div className="app-wrapper">
      <Navbar currentPage={currentPage} setCurrentPage={handleNavigate} />
      <main>
        {currentPage === 'landing' && <LandingPage onNavigate={handleNavigate} />}
        
        {/* Use exact filename case you created in /Doctorspage */}
        {currentPage === 'doctors' && (
          <DoctorsPage 
            onNavigate={handleNavigate} 
            onAddAppointment={handleAddAppointment}
          />
        )}
        
        {currentPage === 'dashboard' && <DashboardPage appointments={appointments} />}
      </main>
    </div>
  );
}