import React, { useMemo } from 'react';
import './NetworkFlow.css';
import { Icon } from '@iconify/react';

/**
 * ============================================================
 * ICON LIBRARY 
 * (Width 28.67px, Height 33.33px - Applied to ALL 6 icons)
 * ============================================================
 */
const ICONS = {
  // 1. Hugeicons Patient
  patient: (
    <Icon 
      icon="hugeicons:patient" 
      width="26.666669845581055" 
      height="33.333984375" 
      style={{ color: 'currentColor' }} 
    />
  ),

  // 2. Hugeicons Doctor-01
  doctor: (
    <Icon 
      icon="hugeicons:doctor-01" 
      width="28.67" 
      height="33.33" 
      style={{ color: 'currentColor' }} 
    />
  ),

  // 3. Hospital icon 
  hospital: (
    <Icon 
      icon="hugeicons:doctor-01" 
      width="28.67" 
      height="33.33" 
      style={{ color: 'currentColor' }} 
    />
  ),

  // 4. Laboratory icon 
  laboratory: (
    <Icon 
      icon="hugeicons:doctor-01" 
      width="28.67" 
      height="33.33" 
      style={{ color: 'currentColor' }} 
    />
  ),

  // 5. Pharmacy icon 
  pharmacy: (
    <Icon 
      icon="hugeicons:doctor-01" 
      width="28.67" 
      height="33.33" 
      style={{ color: 'currentColor' }} 
    />
  ),

  // 6. Insurance icon (Exact matched to Figma)
  insurance: (
    <Icon 
      icon="hugeicons:doctor-01" 
      width="28.67" 
      height="33.33" 
      style={{ color: 'currentColor' }} 
    />
  ),
};

/**
 * ============================================================
 * CONFIGURATION DATA
 * ============================================================
 */
const NETWORK_STEPS = [
  {
    id: 'p-1',
    icon: ICONS.patient,
    title: 'Patients',
    desc: 'Manage your health and\naccess care',
  },
  {
    id: 'p-2',
    icon: ICONS.doctor,
    title: 'Doctors',
    desc: 'Doctor care and\nconsultations',
  },
  {
    id: 'p-3',
    icon: ICONS.hospital,
    title: 'Hospitals',
    desc: 'Streamline operations and\npatient care',
  },
  {
    id: 'p-4',
    icon: ICONS.laboratory,
    title: 'Laboratories',
    desc: 'Accurate tests and timely\nreports',
  },
  {
    id: 'p-5',
    icon: ICONS.pharmacy,
    title: 'Pharmacies',
    desc: 'Dispense and deliver\nmedicine with ease',
  },
  {
    id: 'p-6',
    icon: ICONS.insurance,
    title: 'Insurance',
    desc: 'Simplify policies and\nclaims',
  },
];

/**
 * ============================================================
 * MAIN COMPONENT
 * ============================================================
 */
export default function NetworkFlow({ onNavigate }) {
  const renderedSteps = useMemo(() => {
    return NETWORK_STEPS.map((step, idx) => {
      const isLast = idx === NETWORK_STEPS.length - 1;

      return (
        <React.Fragment key={step.id}>
          <div className="network-node">
            <div className="network-node__circle">
              <div className="network-node__icon">
                {step.icon}
              </div>
            </div>
            <h3 className="network-node__title">{step.title}</h3>
            <p className="network-node__desc">{step.desc}</p>
          </div>

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
        <div className="network__heading">
          <span className="network__super-title">ONE CONNECTED HEALTHCARE NETWORK</span>
          <h2 className="network__title">Built to connect every participant in the healthcare journey</h2>
          <p className="network__subtitle">From booking to recovery, we make healthcare simple, accessible and personalized for you.</p>
        </div>

        <div className="network__pipeline">{renderedSteps}</div>

        <div className="network__action">
          <button onClick={() => onNavigate?.('dashboard')} className="network__btn" type="button">
            Explore Ecosystem
          </button>
        </div>
      </div>
    </section>
  );
}