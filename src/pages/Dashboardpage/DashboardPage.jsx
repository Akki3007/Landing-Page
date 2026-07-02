import React, { useState, useCallback, useMemo, memo } from 'react';
import './DashboardPage.css';

// Sub-component: Vital Metric Card (Memoized)
const VitalCard = memo(({ icon, label, value, unit, status, statusColor, iconBg }) => (
  <div className="vital-card">
    <div className="vital-card__header">
      <span className="vital-card__icon" style={{ backgroundColor: iconBg }}>{icon}</span>
      <span className={`vital-card__status vital-card__status--${status.toLowerCase()}`}>
        {status}
      </span>
    </div>
    <span className="vital-card__label">{label}</span>
    <p className="vital-card__value">{value} <span className="vital-card__unit">{unit}</span></p>
  </div>
));

// Sub-component: Chart Component (Memoized to prevent path recalculation)
const VitalsChart = memo(() => (
  <div className="chart-container">
    <svg viewBox="0 0 500 200" className="chart-svg">
      <path 
        d="M 50 150 L 120 120 L 190 130 L 260 80 L 330 95 L 400 50 L 470 60" 
        fill="none" 
        stroke="var(--color-primary)" 
        strokeWidth="4" 
        strokeLinecap="round"
      />
      {[
        {cx: 50, cy: 150}, {cx: 120, cy: 120}, {cx: 190, cy: 130},
        {cx: 260, cy: 80}, {cx: 330, cy: 95}, {cx: 400, cy: 50}, {cx: 470, cy: 60}
      ].map((dot, i) => (
        <circle key={i} cx={dot.cx} cy={dot.cy} r="6" fill="#ffffff" stroke="var(--color-primary)" strokeWidth="3" />
      ))}
    </svg>
    <div className="chart-labels">
      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => <span key={day}>{day}</span>)}
    </div>
  </div>
));

export default function DashboardPage({ appointments = [] }) {
  // 1. Local State
  const [prescriptions, setPrescriptions] = useState([
    { id: 1, name: 'Amoxicillin 500mg', dosage: '1 capsule three times daily', taken: false },
    { id: 2, name: 'Lisinopril 10mg', dosage: '1 tablet once daily in the morning', taken: true },
    { id: 3, name: 'Atorvastatin 20mg', dosage: '1 tablet daily at bedtime', taken: false }
  ]);

  // 2. Logic Handlers
  const togglePrescription = useCallback((id) => {
    setPrescriptions(prev => 
      prev.map(item => item.id === id ? { ...item, taken: !item.taken } : item)
    );
  }, []);

  // 3. Computed Data (Memoized)
  const vitalsData = useMemo(() => [
    { id: 'v-1', icon: '❤️', label: 'Heart Rate', value: '72', unit: 'bpm', status: 'Normal', iconBg: '#fee2e2' },
    { id: 'v-2', icon: '🫁', label: 'Blood Pressure', value: '120/80', unit: 'mmHg', status: 'Normal', iconBg: '#e0f2fe' },
    { id: 'v-3', icon: '🩸', label: 'Blood Sugar', value: '142', unit: 'mg/dL', status: 'Attention', iconBg: '#fef3c7' }
  ], []);

  return (
    <div className="dashboard-page container animate-fade-in">
      
      <header className="dashboard-page__header">
        <h2 className="dashboard-page__title">Good Morning, Alexander!</h2>
        <p className="dashboard-page__sub">Here is your automated clinical metrics overview for today.</p>
      </header>

      {/* Vitals metrics blocks */}
      <div className="vitals-grid">
        {vitalsData.map(vital => (
          <VitalCard key={vital.id} {...vital} />
        ))}
      </div>

      <div className="dashboard-layout">
        <div className="dashboard-layout__col flex-col">
          {/* Chart progress panel */}
          <section className="dashboard-panel">
            <h3 className="dashboard-panel__title">Weekly Vitals Progress</h3>
            <VitalsChart />
          </section>

          {/* Booked Appointments lists timeline */}
          <section className="dashboard-panel" style={{ marginTop: '24px' }}>
            <h3 className="dashboard-panel__title">Booked Consultations</h3>
            <div className="appointments-list">
              {appointments.length > 0 ? (
                appointments.map((app) => (
                  <div key={app.id} className="appointment-row">
                    <img src={app.avatar} alt={app.doctorName} className="appointment-row__avatar" />
                    <div className="appointment-row__info">
                      <h4 className="appointment-row__name">{app.doctorName}</h4>
                      <p className="appointment-row__meta">{app.specialty} • {app.date} at {app.time}</p>
                    </div>
                    <span className="appointment-row__badge">Confirmed</span>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: '13px', color: 'var(--color-slate-400)', textAlign: 'center', padding: '10px 0' }}>
                  No consultations scheduled yet.
                </p>
              )}
            </div>
          </section>
        </div>

        {/* Prescription interactive checklist */}
        <aside className="dashboard-panel">
          <h3 className="dashboard-panel__title">Prescriptions Checklist</h3>
          <div className="prescription-list">
            {prescriptions.map((item) => (
              <div 
                key={item.id} 
                onClick={() => togglePrescription(item.id)} 
                className={`prescription-item ${item.taken ? 'prescription-item--checked' : ''}`}
                role="checkbox"
                aria-checked={item.taken}
                tabIndex={0}
              >
                <div className="prescription-checkbox">
                  {item.taken && (
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </div>
                <div>
                  <h4 className="prescription-name">{item.name}</h4>
                  <p className="prescription-dosage">{item.dosage}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}