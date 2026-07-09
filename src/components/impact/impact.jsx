import React from "react";
import "./Impact.css";
import { Icon } from "@iconify/react";

const stats = [
  {
    value: "1M+",
    label: "Patients Supported",
    iconClass: "impact-icon-wrapper icon-purple",
    iconColor: "#6B0953",
  },
  {
    value: "50K+",
    label: "Appointments Completed",
    iconClass: "impact-icon-wrapper icon-blue",
    iconColor: "#1D5C8A",
  },
  {
    value: "500+",
    label: "Healthcare Providers",
    iconClass: "impact-icon-wrapper icon-purple",
    iconColor: "#6B0953",
  },
  {
    value: "99.9%",
    label: "Platform Availability",
    iconClass: "impact-icon-wrapper icon-orange",
    iconColor: "#C55D14",
  },
];

// Extracted helper component to optimize React rendering performance
const DNAIcon = ({ iconClass, iconColor }) => (
  <div className={iconClass}>
    <Icon
      icon="hugeicons:ai-dna"
      width="32"
      height="32"
      style={{ color: iconColor }}
    />
  </div>
);

const ImpactSection = () => {
  return (
    <section className="impact-frame">
      {/* ── Header Block (Frame 503) ── */}
      <div className="impact-header">
        <p className="impact-tag">Our Impact in Numbers</p>
        <h2 className="impact-title">
          Healthcare you can trust,
          <br />
          backed by <span className="impact-highlight">real results</span>
        </h2>
      </div>

      {/* ── Cards Row ── */}
      <div className="impact-cards-row">
        {stats.map((stat) => (
          <div className="impact-card" key={stat.label}>
            {/* Icon Wrapper */}
            <DNAIcon
              iconClass={stat.iconClass}
              iconColor={stat.iconColor}
            />

            {/* Text Group */}
            <div className="impact-text">
              <p className="impact-value">{stat.value}</p>
              <p className="impact-label">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImpactSection;