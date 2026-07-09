import React from 'react';
import logo from '../../assets/logo.png';
import './Footer.css';
import doctorsImg from '../../assets/doctors.png';
import { Icon } from '@iconify/react';

const LinkCol = ({ title, items }) => (
  <div className="ft-col">
    <h4 className="ft-title">{title}</h4>
    <ul className="ft-list">
      {items.map(i => <li key={i} className="ft-item">{i}</li>)}
    </ul>
  </div>
);

export default function Footer({ onNavigate }) {
  return (
    <footer>
      {/* CTA Banner */}
      <div className="ft-cta">
        <div className="ft-cta-container">
          <div className="ft-cta-img-wrap">
            <img 
              src={doctorsImg} 
              alt="Medical Team" 
              className="ft-cta-photo"
            />
          </div>

          <div className="ft-cta-content">
            <h2 className="ft-cta-h2">
              Ready to take charge<br/>of your health?
            </h2>
            <p className="ft-cta-p">Book an appointment or consult a doctor online</p>
            <div className="ft-cta-btns">
              {/* Frame 88 — Book Appointment (Solid) */}
              <button onClick={() => onNavigate?.('doctors')} className="ft-btn ft-btn-solid">
                <Icon 
                  icon="tabler:calendar" 
                  width="24" 
                  height="24" 
                  className="ft-btn-icon"
                />
                Book Appointment
              </button>
              {/* Frame 89 — Consult Online (Outline) — tabler:video 24x24 */}
              <button className="ft-btn ft-btn-outline">
                <Icon 
                  icon="tabler:video" 
                  width="24" 
                  height="24" 
                  className="ft-btn-icon"
                />
                Consult Online
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links — 5 Column Grid */}
      <div className="ft-main">
        <div className="container">
          <div className="ft-grid">
            
            {/* 1. Brand Column */}
            <div className="ft-brand">
              <img src={logo} alt="MediConnect" className="ft-logo"/>
              <p className="ft-brand-p">
                One integrated platform for all your healthcare needs, Empowering Hospitals, Doctors and patients with AI and Technology.
              </p>
            </div>

            {/* 2. Platform Column */}
            <LinkCol title="Platform" items={['Hospital Management','Telemedicine','Pharmacy System','Lab Management','Health Insurance','Appointment and Scheduling','Remote monitoring','AI & Analytics']} />
            
            {/* 3. Resources Column */}
            <LinkCol title="Resources" items={['Documentation','API Reference','Integration','Case studies']} />
            
            {/* 4. Company Column */}
            <LinkCol title="Company" items={['About Us','Careers','Press','Partners','Blog','Contact Us']} />

            {/* 5. Newsletter Column */}
            <div className="ft-newsletter">
              <h4 className="ft-title">Newsletter</h4>
              <p className="ft-news-p">Subscribe to get latest updates!</p>
              <div className="ft-form">
                <input placeholder="Enter Your Email ID" className="ft-inp"/>
                <button className="ft-go" aria-label="Subscribe">
                  <Icon icon="tabler:arrow-right" width="18" height="18" />
                </button>
              </div>
              
              <h4 className="ft-title" style={{ margin: '0' }}>Our Socials</h4>
              <div className="ft-socials">
                <button className="ft-soc-btn" aria-label="Twitter">
                  <Icon icon="prime:twitter" width="16" height="16" className="ft-soc-icon" />
                </button>
                <button className="ft-soc-btn" aria-label="YouTube">
                  <Icon icon="mdi:youtube" width="16" height="16" className="ft-soc-icon" />
                </button>
                <button className="ft-soc-btn" aria-label="Facebook">
                  <Icon icon="ic:outline-facebook" width="16" height="16" className="ft-soc-icon" />
                </button>
                <button className="ft-soc-btn" aria-label="LinkedIn">
                  <Icon icon="mdi:linkedin" width="16" height="16" className="ft-soc-icon" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="ft-bottom">
            <p className="ft-bottom-text">
              © 2026 Healthcare. All Rights Reserved. Privacy policy, Terms of Service, HIPAA Notice, Cookie Settings, Accessibility.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}