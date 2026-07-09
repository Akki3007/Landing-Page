import React, { useState, useRef, useEffect, useCallback } from "react";
import logo from "../../assets/logo.png";
import "./Navbar.css";

import {
    FiChevronDown,
    FiUser,
    FiLogIn,
    FiActivity,
    FiCalendar,
    FiFileText,
    FiShield,
    FiUsers,
    FiBriefcase,
    FiBarChart2,
} from "react-icons/fi";

import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

/* ======================================================
   NAVIGATION DATA
====================================================== */

const NAV_ITEMS = [
    {
        id: "home",
        title: "Home",
        page: "landing",
    },
    {
        id: "solutions",
        title: "Solutions",
        dropdown: [
            {
                icon: <FiActivity />,
                title: "Telemedicine",
                desc: "Virtual consultations for patients",
            },
            {
                icon: <FiCalendar />,
                title: "Appointment Booking",
                desc: "Smart scheduling system",
            },
            {
                icon: <FiFileText />,
                title: "Health Records",
                desc: "Secure digital medical history",
            },
            {
                icon: <FiShield />,
                title: "Data Security",
                desc: "HIPAA-compliant infrastructure",
            },
        ],
    },
    {
        id: "patients",
        title: "For Patients",
        page: "doctors",
    },
    {
        id: "providers",
        title: "For Providers",
        dropdown: [
            {
                icon: <FiUsers />,
                title: "Clinics",
                desc: "Manage staff & patients easily",
            },
            {
                icon: <FiBriefcase />,
                title: "Hospitals",
                desc: "Enterprise-grade tools",
            },
            {
                icon: <FiBarChart2 />,
                title: "Analytics",
                desc: "Track performance & outcomes",
            },
        ],
    },
    {
        id: "pricing",
        title: "Pricing",
        page: "pricing",
    },
    {
        id: "resources",
        title: "Resources",
        page: "resources",
    },
];

export default function Navbar({ currentPage, setCurrentPage }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [scrolled, setScrolled] = useState(false);

    const navRef = useRef(null);

    /* ======================================================
       SCROLL EFFECT
    ====================================================== */

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 8);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    /* ======================================================
       OUTSIDE CLICK + ESCAPE KEY
    ====================================================== */

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (navRef.current && !navRef.current.contains(e.target)) {
                setActiveDropdown(null);
            }
        };

        const handleEscape = (e) => {
            if (e.key === "Escape") {
                setActiveDropdown(null);
                setMobileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    /* ======================================================
       LOCK BODY SCROLL WHEN MOBILE MENU OPEN
    ====================================================== */

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    const navigate = useCallback(
        (page) => {
            if (!page) return;
            setCurrentPage(page);
            setMobileOpen(false);
            setActiveDropdown(null);
        },
        [setCurrentPage]
    );

    const toggleDropdown = (id) => {
        setActiveDropdown((prev) => (prev === id ? null : id));
    };

    return (
        <header
            ref={navRef}
            className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
        >
            <div className="navbar__container">
                {/* ================= Logo ================= */}

                <button
                    type="button"
                    className="navbar__brand"
                    onClick={() => navigate("landing")}
                >
                    <img
                        src={logo}
                        alt="MediConnect Healthcare Ecosystem"
                        className="navbar__logo"
                    />
                </button>

                {/* ================= Desktop Menu ================= */}

                <nav className="navbar__menu" aria-label="Primary Navigation">
                    {NAV_ITEMS.map((item) => {
                        if (item.dropdown) {
                            const isOpen = activeDropdown === item.id;

                            return (
                                <div
                                    key={item.id}
                                    className="navbar__dropdown-wrapper"
                                    onMouseEnter={() => setActiveDropdown(item.id)}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <button
                                        type="button"
                                        className={`navbar__dropdown-trigger ${isOpen ? "navbar__dropdown-trigger--active" : ""
                                            }`}
                                        aria-expanded={isOpen}
                                        onClick={() => toggleDropdown(item.id)}
                                    >
                                        <span>{item.title}</span>
                                        <FiChevronDown
                                            className={`navbar__chevron ${isOpen ? "navbar__chevron--rotated" : ""
                                                }`}
                                        />
                                    </button>

                                    <div
                                        className={`navbar__dropdown-panel ${isOpen ? "navbar__dropdown-panel--open" : ""
                                            }`}
                                    >
                                        {item.dropdown.map((sub, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                className="navbar__dropdown-item"
                                            >
                                                <span className="navbar__dropdown-icon">
                                                    {sub.icon}
                                                </span>
                                                <span className="navbar__dropdown-text">
                                                    <span className="navbar__dropdown-title">
                                                        {sub.title}
                                                    </span>
                                                    <span className="navbar__dropdown-desc">
                                                        {sub.desc}
                                                    </span>
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <button
                                key={item.id}
                                type="button"
                                className={`navbar__link ${currentPage === item.page ? "navbar__link--active" : ""
                                    }`}
                                onClick={() => navigate(item.page)}
                            >
                                {item.title}
                            </button>
                        );
                    })}
                </nav>

                {/* ================= Desktop Buttons ================= */}

                <div className="navbar__actions">
                    <button type="button" className="navbar__btn-secondary">
                        <FiUser className="navbar__btn-icon" />
                        <span>Sign up</span>
                    </button>

                    {/* ===== ONLY CHANGE: Swapped FiLogIn with FiUser ===== */}
                    <button type="button" className="navbar__btn-primary">
                        <FiUser className="navbar__btn-icon" />
                        <span>Login</span>
                    </button>
                </div>

                {/* ================= Mobile Toggle ================= */}

                <button
                    type="button"
                    className="navbar__mobile-toggle"
                    onClick={() => setMobileOpen((prev) => !prev)}
                    aria-label="Toggle navigation menu"
                    aria-expanded={mobileOpen}
                >
                    {mobileOpen ? <IoClose size={26} /> : <HiOutlineMenuAlt3 size={26} />}
                </button>
            </div>

            {/* ================= Mobile Overlay ================= */}

            <div
                className={`navbar__overlay ${mobileOpen ? "navbar__overlay--visible" : ""
                    }`}
                onClick={() => setMobileOpen(false)}
            />

            {/* ================= Mobile Drawer ================= */}

            <div
                className={`navbar__mobile-drawer ${mobileOpen ? "navbar__mobile-drawer--open" : ""
                    }`}
            >
                {NAV_ITEMS.map((item) => {
                    if (item.dropdown) {
                        const isOpen = activeDropdown === item.id;

                        return (
                            <div key={item.id} className="navbar__mobile-group">
                                <button
                                    type="button"
                                    className="navbar__mobile-link navbar__mobile-link--dropdown"
                                    onClick={() => toggleDropdown(item.id)}
                                    aria-expanded={isOpen}
                                >
                                    <span>{item.title}</span>
                                    <FiChevronDown
                                        className={`navbar__chevron ${isOpen ? "navbar__chevron--rotated" : ""
                                            }`}
                                    />
                                </button>

                                <div
                                    className={`navbar__mobile-submenu ${isOpen ? "navbar__mobile-submenu--open" : ""
                                        }`}
                                >
                                    {item.dropdown.map((sub, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            className="navbar__mobile-subitem"
                                        >
                                            {sub.icon}
                                            <span>{sub.title}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        );
                    }

                    return (
                        <button
                            key={item.id}
                            type="button"
                            className={`navbar__mobile-link ${currentPage === item.page
                                    ? "navbar__mobile-link--active"
                                    : ""
                                }`}
                            onClick={() => navigate(item.page)}
                        >
                            {item.title}
                        </button>
                    );
                })}

                <div className="navbar__mobile-actions">
                    <button type="button" className="navbar__btn-secondary">
                        <FiUser className="navbar__btn-icon" />
                        <span>Sign up</span>
                    </button>

                    {/* ===== Mobile Login icon changed too ===== */}
                    <button type="button" className="navbar__btn-primary">
                        <FiUser className="navbar__btn-icon" />
                        <span>Login</span>
                    </button>
                </div>
            </div>
        </header>
    );
}