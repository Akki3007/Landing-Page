import React from 'react';
import Hero from '../../components/hero/Hero';
import SearchUtility from '../../components/searchutility/SearchUtility';
import Services from '../../components/services/Services';
import NetworkFlow from '../../components/networkflow/NetworkFlow';
import Intelligence from '../../components/intelligence/Intelligence';
import Impact from '../../components/impact/Impact';
import Testimonials from '../../components/testimonials/Testimonials';
import Footer from '../../components/footer/Footer';
import './LandingPage.css';

export default function LandingPage({ onNavigate }) {
  return (
    <div className="landing-page animate-fade-in">
      <Hero onNavigate={onNavigate} />
      <SearchUtility />
      <Services />
      <NetworkFlow onNavigate={onNavigate} />
      <Intelligence />
      <Impact />
      <Testimonials />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}