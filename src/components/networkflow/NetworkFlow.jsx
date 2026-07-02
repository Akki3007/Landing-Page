import React, { useMemo } from 'react';
import './NetworkFlow.css';

/**
 * Advanced Logic: Externalized SVG Library
 * Keeps the component clean and allows for easy icon updates.
 */
const ICONS = {
  patient: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7" r="3" />
      <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
      <path d="M4 15h2M5 13v4" />
    </svg>
  ),
  provider: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7" r="3" />
      <path d="M5.5 21v-1a4.5 4.5 0 0 1 4.5-4.5h4a4.5 4.5 0 0 1 4.5 4.5v1" />
      <path d="M10 11.5a2.5 2.5 0 0 0 4 0" />
      <path d="M12 14v2" />
    </svg>
  ),
};

/**
 * Advanced Logic: Configuration Data
 * Separating content from logic for better scalability.
 */
const NETWORK_STEPS = [
  { id: 'p-1', icon: ICONS.patient, title: 'Patients', desc: 'Manage your health and\naccess care' },
  { id: 'p-2', icon: ICONS.provider, title: 'Doctors', desc: 'Doctor care and\nconsultations' },
  { id: 'p-3', icon: ICONS.provider, title: 'Hospitals', desc: 'Streamline optierations and\npatient care' },
  { id: 'p-4', icon: ICONS.provider, title: 'Laboratories', desc: 'Accurate tests and timely\nreports' },
  { id: 'p-5', icon: ICONS.provider, title: 'Pharmacies', desc: 'Dispense and deliver\nmedicine with ease' },
  { id: 'p-6', icon: ICONS.provider, title: 'Insurance', desc: 'Simplify policies and\nclaims' },
];

export default function NetworkFlow({ onNavigate }) {

  /**
   * Advanced Logic: useMemo
   * Prevents the list from being re-calculated on every parent re-render.
   */
  const renderedSteps = useMemo(() => {
    return NETWORK_STEPS.map((step, idx) => {
      const isLast = idx === NETWORK_STEPS.length - 1;

      return (
        <React.Fragment key={step.id}>
          {/* Step Node */}
          <div className="network-node">
            <div className="network-node__circle">
              <div className="network-node__icon">
                {step.icon}
              </div>
            </div>
            <h3 className="network-node__title">{step.title}</h3>
            <p className="network-node__desc">{step.desc}</p>
          </div>

          {/* Dotted Arrow Separator */}
          {!isLast && (
            <div className="network__arrow" aria-hidden="true">
              <svg viewBox="0 0 100 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3">
                <line x1="0" y1="8" x2="90" y2="8" />
                <path d="M84 4 L90 8 L84 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="none" />
              </svg>
            </div>
          )}
        </React.Fragment>
      );
    });
  }, []);

  return (
    <section className="network">
      <div className="network__container">

        {/* Headings */}
        <div className="network__heading">
          <span className="network__super-title">ONE CONNECTED HEALTHCARE NETWORK</span>
          <h2 className="network__title">Built to connect every participant in the healthcare journey</h2>
          <p className="network__subtitle">
            From booking to recovery, we make healthcare simple, accessible and personalized for you.
          </p>
        </div>

        {/* Steps and Connections */}
        <div className="network__pipeline">
          {renderedSteps}
        </div>

        {/* Action Button */}
        <div className="network__action">
          <button
            onClick={() => onNavigate?.('dashboard')}
            className="network__btn"
            type="button"
          >
            Explore Ecosystem
          </button>
        </div>

      </div>
    </section>
  );
}