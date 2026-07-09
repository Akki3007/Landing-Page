import React, { useMemo, memo } from 'react';
import './Intelligence.css';
import { Icon } from '@iconify/react';

// Import images - CORRECTED PATHS
import aiHealthImg from '../../assets/ai-health.png';
import medicalRecordsImg from '../../assets/medical-records.png';
import secureNetworkImg from '../../assets/secure-network.png';
import continuousCareImg from '../../assets/continuous-care.png';

// ============================================
// INTEL DATA
// ============================================

const INTEL_DATA = [
  {
    id: 'i1',
    badge: 'AI Health Insights',
    title: 'Receive personalized health recommendations and risk assessments.',
    bullets: [
      'Instant symptom analysis',
      'Health risk assessment',
      'Personalized recommendations'
    ],
    image: aiHealthImg,
    icon: 'hugeicons:ai-dna'
  },
  {
    id: 'i2',
    badge: 'Connected Medical Records',
    title: 'Access prescriptions, reports, and consultations from one place.',
    bullets: [
      'All records in one place',
      'Easy access anytime',
      '100% secure & private'
    ],
    image: medicalRecordsImg,
    icon: 'tabler:clipboard-text'
  },
  {
    id: 'i3',
    badge: 'Secure Healthcare Network',
    title: 'Enterprise-grade security and privacy protection.',
    bullets: [
      'End-to-end encryption',
      'Zero-trust architecture',
      'HIPAA & GDPR compliant'
    ],
    image: secureNetworkImg,
    icon: 'tabler:ambulance'
  },
  {
    id: 'i4',
    badge: 'Continuous Care',
    title: 'From appointments to follow-ups and monitoring.',
    bullets: [
      'Health tips & articles',
      'Lifestyle recommendations',
      'Connect with experts'
    ],
    image: continuousCareImg,
    icon: 'tabler:user-heart'
  }
];

// ============================================
// CHECK ICON - 24px x 18.67px
// ============================================

const CheckIcon = memo(() => (
  <svg
    className="bullet-icon"
    width="24"
    height="18.67"
    viewBox="0 0 24 18.67"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
));

CheckIcon.displayName = 'CheckIcon';

// ============================================
// CARD COMPONENT
// ============================================

const IntelCard = memo(({ data }) => {
  const { image, badge, icon, title, bullets } = data;

  return (
    <div className="intel-card">
      <div className="intel-vis-wrap">
        <img
          src={image}
          alt={badge}
          className="intel-img"
          loading="lazy"
        />
      </div>

      <div className="intel-content">
        <div className="intel-heading">
          <div className="intel-icon-wrap">
            <Icon
              icon={icon}
              className="intel-icon"
              width="32"
              height="32"
              aria-hidden="true"
            />
          </div>

          <h3 className="intel-badge">
            {badge}
          </h3>
        </div>

        <p className="intel-title">
          {title}
        </p>

        <ul className="intel-list">
          {bullets.map((bullet) => (
            <li key={bullet} className="intel-li">
              <CheckIcon />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

IntelCard.displayName = 'IntelCard';

// ============================================
// MAIN COMPONENT
// ============================================

const Intelligence = memo(() => {
  const grid = useMemo(
    () => INTEL_DATA.map((data) => (
      <IntelCard
        key={data.id}
        data={data}
      />
    )),
    []
  );

  return (
    <section className="intelligence-section" aria-label="Healthcare intelligence features">
      <div className="intel-container">
        <header className="sec-header">
          <span className="sec-tag">
            WHY CHOOSE US?
          </span>

          <h2 className="sec-title">
            Healthcare Powered by Intelligence
          </h2>
        </header>

        <div className="intel-grid">
          {grid}
        </div>
      </div>
    </section>
  );
});

Intelligence.displayName = 'Intelligence';

export default Intelligence;