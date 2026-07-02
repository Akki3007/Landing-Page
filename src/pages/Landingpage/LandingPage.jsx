import React from "react";
import Hero from "../../components/hero/Hero";
import SearchUtility from "../../components/searchutility/SearchUtility";
import Services from "../../components/services/Services";
import NetworkFlow from "../../components/networkflow/NetworkFlow";
import "./LandingPage.css";

function LandingPage({ onNavigate }) {
    return (
        <div className="landing-page animate-fade-in">
            <Hero onNavigate={onNavigate} />
            <SearchUtility />
            <Services />
            <NetworkFlow onNavigate={onNavigate} />
        </div>
    );
}

export default LandingPage;