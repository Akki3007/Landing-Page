import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import heroImage from "../../assets/Hero.png";
import './Hero.css';

/* ======================================================
   ICON COMPONENTS (Extracted for reusability & clarity)
====================================================== */

const IconSparkle = () => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="hero__badge-icon">
        <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z" />
    </svg>
);

const IconCalendar = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
);

const IconVideo = ({ strokeWidth = "2.5" }) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="m22 8-6 4 6 4V8Z" />
        <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
    </svg>
);

IconVideo.propTypes = {
    strokeWidth: PropTypes.string,
};

const IconShieldCheck = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 11 11 13 15 9" />
    </svg>
);

const IconCircleCheck = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="8 12 11 15 16 9" />
    </svg>
);

const IconLock = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="16" height="11" x="4" y="11" rx="2" ry="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
);

const IconHeadset = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
);

const IconUsers = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="19" y1="8" x2="19" y2="14" />
        <line x1="16" y1="11" x2="22" y2="11" />
    </svg>
);

const IconFlask = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2h4" />
        <path d="M12 2v15a3 3 0 0 0 6 0V2Z" />
        <line x1="12" y1="11" x2="16" y2="11" />
        <line x1="12" y1="7" x2="16" y2="7" />
    </svg>
);

/* ======================================================
   STATIC DATA (Defined outside component — never re-created)
====================================================== */

const TRUST_SIGNALS = [
    {
        modifier: 'trusted',
        icon: <IconShieldCheck />,
        title: 'Trusted by',
        desc: '1M+ Patients',
    },
    {
        modifier: 'verified',
        icon: <IconCircleCheck />,
        title: 'Verified',
        desc: 'Healthcare Experts',
    },
    {
        modifier: 'secure',
        icon: <IconLock />,
        title: 'Secure & Confidential',
        desc: 'Your data is protected',
    },
    {
        modifier: 'care',
        icon: <IconHeadset />,
        title: '24/7 Care',
        desc: "We're here for you",
    },
];

const FLOATING_WIDGETS = [
    {
        modifier: 'consult',
        icon: <IconVideo strokeWidth="2.2" />,
        title: 'Consult Online',
        desc: 'Connect in Few Seconds',
    },
    {
        modifier: 'doctors',
        icon: <IconUsers />,
        title: 'Find Doctors',
        desc: 'Verified specialists',
    },
    {
        modifier: 'tests',
        icon: <IconFlask />,
        title: 'Lab Tests',
        desc: 'Book tests at home',
    },
];

/* ======================================================
   SUBCOMPONENTS
====================================================== */

const TrustItem = React.memo(function TrustItem({ modifier, icon, title, desc }) {
    return (
        <div className={`hero__trust-item hero__trust-item--${modifier}`}>
            <div className="hero__trust-icon">
                {icon}
            </div>
            <div className="hero__trust-text-stack">
                <p className="hero__trust-title">{title}</p>
                <p className="hero__trust-desc">{desc}</p>
            </div>
        </div>
    );
});

TrustItem.propTypes = {
    modifier: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
};

const FloatingWidget = React.memo(function FloatingWidget({ modifier, icon, title, desc }) {
    return (
        <div className={`hero-widget hero-widget--${modifier}`}>
            <div className="hero-widget__icon">
                {icon}
            </div>
            <div className="hero-widget__text-container">
                <p className="hero-widget__title">{title}</p>
                <p className="hero-widget__desc">{desc}</p>
            </div>
        </div>
    );
});

FloatingWidget.propTypes = {
    modifier: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
};

/* ======================================================
   MAIN COMPONENT
====================================================== */

function Hero({ onNavigate }) {

    const handleBookAppointment = useMemo(
        () => () => onNavigate('doctors'),
        [onNavigate]
    );

    return (
        <section className="hero animate-fade-in">
            <div className="container">
                <div className="hero__grid">

                    {/* Left Content Column */}
                    <div className="hero__l-container">
                        <div className="hero__container-text">

                            {/* AI badge */}
                            <div className="hero__frame-290">
                                <IconSparkle />
                                <span className="hero__badge-text">AI-Powered Healthcare Ecosystem</span>
                            </div>

                            {/* Heading & Subheading Block */}
                            <div className="hero__frame-98">
                                <h1 className="hero__headline">
                                    One Platform for the <br />Entire <span className="hero__headline-accent">Healthcare Ecosystem</span>
                                </h1>

                                <p className="hero__subtext">
                                    Connect Patients, Doctors, Hospitals, Laboratories, Pharmacies, Insurance, and Healthcare providers through one secure AI-powered platform.
                                </p>
                            </div>

                            {/* Actions Block */}
                            <div className="hero__frame-100">
                                <button
                                    onClick={handleBookAppointment}
                                    className="hero__btn-appointment"
                                    type="button"
                                >
                                    <IconCalendar />
                                    Book Appointment
                                </button>
                                <button className="hero__btn-consult" type="button">
                                    <IconVideo />
                                    Consult Online
                                </button>
                            </div>

                            {/* Trust Signals Footer */}
                            <div className="hero__frame-88">
                                {TRUST_SIGNALS.map((item) => (
                                    <TrustItem key={item.modifier} {...item} />
                                ))}
                            </div>

                        </div>
                    </div>

                    {/* Right Visual Image Panel with Widgets */}
                    <div className="hero__visual">
                        <div className="hero__image-wrapper">
                            <div className="hero__image-card">
                                <img src={heroImage} alt="Doctors smiling" className="hero__image" />
                            </div>

                            {FLOATING_WIDGETS.map((widget) => (
                                <FloatingWidget key={widget.modifier} {...widget} />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

Hero.propTypes = {
    onNavigate: PropTypes.func.isRequired,
};

export default React.memo(Hero);