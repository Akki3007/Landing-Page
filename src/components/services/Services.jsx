import React, { useMemo, memo } from 'react';
import './Services.css';

/**
 * Advanced Logic: Externalized Asset Library
 * Icons are stored outside the component to prevent recreation on every render.
 */
const SERVICE_ASSETS = {
    consultation: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    ),
    lab: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="10" y1="2" x2="10" y2="8" />
            <line x1="14" y1="2" x2="14" y2="8" />
            <line x1="8" y1="2" x2="16" y2="2" />
            <path d="M16 8V10a4 4 0 0 1-8 0V8" />
            <path d="M12 22H10A6 6 0 0 1 4 16V10a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6a6 6 0 0 1-6 2z" />
        </svg>
    ),
    pharmacy: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
            <path d="m8.5 8.5 7 7" />
        </svg>
    ),
    records: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
    ),
    insurance: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polyline points="9 11 11 13 15 9" />
        </svg>
    ),
    remote: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.55a11 11 0 0 1 14.08 0" />
            <path d="M1.42 9a16 16 0 0 1 21.16 0" />
            <circle cx="12" cy="20" r="2" />
        </svg>
    )
};

const SERVICE_DATA = [
    { id: 'sc-1', icon: SERVICE_ASSETS.consultation, title: 'Doctor Consultation', desc: 'Book appointments with verified doctors across specialities.' },
    { id: 'sc-2', icon: SERVICE_ASSETS.lab, title: 'Lab Tests', desc: 'Book lab tests at Home with certified laboratories.' },
    { id: 'sc-3', icon: SERVICE_ASSETS.pharmacy, title: 'Online Pharmacy', desc: 'Order medicines online and get them delivered to your doorstep.' },
    { id: 'sc-4', icon: SERVICE_ASSETS.records, title: 'Health Records', desc: 'Access prescriptions, reports and medical history securely.' },
    { id: 'sc-5', icon: SERVICE_ASSETS.insurance, title: 'Insurance Claims', desc: 'Verify coverage, file claims and track approvals.' },
    { id: 'sc-6', icon: SERVICE_ASSETS.remote, title: 'Remote Monitoring', desc: 'Track your vitals and stay connected with your care team.' }
];

// Memoized Card Component for zero-unnecessary-renders
const ServiceCard = memo(({ icon, title, desc }) => (
    <div className="services-card" role="button" tabIndex={0}>
        <div className="services-card__content">
            <div className="services-card__icon" aria-hidden="true">
                {icon}
            </div>
            <h3 className="services-card__title">{title}</h3>
            <p className="services-card__desc">{desc}</p>
        </div>

        <div className="services-card__footer">
            <div className="services-card__arrow">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                </svg>
            </div>
        </div>
    </div>
));

export default function Services() {
    
    // Preparation of the grid is memoized
    const renderedGrid = useMemo(() => (
        SERVICE_DATA.map((card) => (
            <ServiceCard 
                key={card.id}
                icon={card.icon}
                title={card.title}
                desc={card.desc}
            />
        ))
    ), []);

    return (
        <section className="services">
            <div className="services__container">
                <header className="services__heading-wrapper">
                    <span className="services__super-heading">EVERYTHING YOU NEED FOR BETTER HEALTHCARE</span>
                    <h2 className="services__title">
                        Access care, diagnostics, medicines, records, insurance, and AI-powered health services from a <span className="services__title-accent">single platform.</span>
                    </h2>
                </header>

                <div className="services__grid-wrapper">
                    <div className="services__grid">
                        {renderedGrid}
                    </div>
                </div>
            </div>
        </section>
    );
}