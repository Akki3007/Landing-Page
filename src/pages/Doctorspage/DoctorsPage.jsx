import React, { useState, useCallback, useMemo, memo } from 'react';
import './DoctorsPage.css';

// ---------------------------
// Static Data (moved outside component to prevent re-creation on every render)
// ---------------------------
const SPECIALTIES = ['All', 'Dermatologist', 'Orthopaedic', 'Paediatrician', 'Gynecologist'];

const DOCTORS_LIST = [
  {
    id: 1,
    name: 'Dr. Sarah Jenkins',
    specialty: 'Dermatologist',
    rating: '4.9',
    reviews: 124,
    fee: '$90',
    timeSlots: ['09:00 AM', '11:00 AM', '02:30 PM', '04:00 PM'],
    avatar: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Orthopaedic',
    rating: '4.8',
    reviews: 98,
    fee: '$110',
    timeSlots: ['10:00 AM', '01:30 PM', '03:00 PM'],
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 3,
    name: 'Dr. Priya Patel',
    specialty: 'Paediatrician',
    rating: '4.9',
    reviews: 142,
    fee: '$85',
    timeSlots: ['08:30 AM', '11:30 AM', '03:30 PM', '05:00 PM'],
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 4,
    name: 'Dr. James Anderson',
    specialty: 'Gynecologist',
    rating: '4.7',
    reviews: 86,
    fee: '$120',
    timeSlots: ['09:30 AM', '12:00 PM', '04:30 PM'],
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=150'
  }
];

// ---------------------------
// Sub-Components (memoized to avoid unnecessary re-renders)
// ---------------------------

const SearchBar = memo(function SearchBar({ value, onChange }) {
  return (
    <div className="doctors-page__search-bar">
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="search-bar-icon"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        type="text"
        placeholder="Search doctor by name..."
        value={value}
        onChange={onChange}
        className="search-bar-input"
      />
    </div>
  );
});

const SpecialtyFilter = memo(function SpecialtyFilter({ active, onSelect }) {
  return (
    <div className="doctors-page__filters">
      <h4 className="doctors-page__filter-title">Specialties</h4>
      <div className="doctors-page__filter-list">
        {SPECIALTIES.map((spec) => (
          <button
            key={spec}
            onClick={() => onSelect(spec)}
            className={`doctors-page__filter-btn ${
              active === spec ? 'doctors-page__filter-btn--active' : ''
            }`}
          >
            {spec}
          </button>
        ))}
      </div>
    </div>
  );
});

const DoctorCard = memo(function DoctorCard({ doctor, onBook }) {
  return (
    <div className="doc-card">
      <div className="doc-card__body">
        <img src={doctor.avatar} alt={doctor.name} className="doc-card__avatar" />
        <div>
          <h3 className="doc-card__name">{doctor.name}</h3>
          <span className="doc-card__spec">{doctor.specialty}</span>
          <div className="doc-card__rating">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="#f59e0b">
              <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span>
              {doctor.rating} ({doctor.reviews} reviews)
            </span>
          </div>
        </div>
      </div>
      <div className="doc-card__footer">
        <div>
          <span className="doc-card__fee-label">Consultation Fee</span>
          <p className="doc-card__fee-value">{doctor.fee}</p>
        </div>
        <button onClick={() => onBook(doctor)} className="doc-card__btn">
          Book Slot
        </button>
      </div>
    </div>
  );
});

const NoDoctorsFound = memo(function NoDoctorsFound() {
  return (
    <div className="no-doctors">
      <span className="no-doctors-icon">🔍</span>
      <h3>No Doctors Found</h3>
      <p>Try searching for a different specialty or keyword.</p>
    </div>
  );
});

const BookingModal = memo(function BookingModal({
  doctor,
  selectedTime,
  bookingConfirmed,
  onClose,
  onSelectTime,
  onConfirm
}) {
  return (
    <div className="booking-modal-overlay animate-fade-in">
      <div className="booking-modal">
        <button onClick={onClose} className="booking-modal__close">
          ✕
        </button>
        {!bookingConfirmed ? (
          <>
            <h3 className="booking-modal__title">Confirm Appointment</h3>
            <div className="booking-modal__doc-info">
              <img src={doctor.avatar} alt={doctor.name} className="booking-modal__avatar" />
              <div>
                <h4 className="booking-modal__doc-name">{doctor.name}</h4>
                <p className="booking-modal__doc-spec">{doctor.specialty}</p>
              </div>
            </div>

            <h4 className="booking-modal__section">Available Slots</h4>
            <div className="booking-modal__slots">
              {doctor.timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => onSelectTime(time)}
                  className={`booking-modal__slot-btn ${
                    selectedTime === time ? 'booking-modal__slot-btn--active' : ''
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>

            <button disabled={!selectedTime} onClick={onConfirm} className="booking-modal__submit">
              Confirm Appointment for {selectedTime || '...'}
            </button>
          </>
        ) : (
          <div className="booking-modal__success text-center">
            <div className="booking-modal__success-icon">✓</div>
            <h3>Appointment Confirmed!</h3>
            <p>Redirecting to your health dashboard...</p>
          </div>
        )}
      </div>
    </div>
  );
});

// ---------------------------
// Custom Hook: encapsulates booking modal state/logic
// ---------------------------
function useBookingFlow(onNavigate, onAddAppointment) {
  const [bookingDoc, setBookingDoc] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const triggerBooking = useCallback((doc) => {
    setBookingDoc(doc);
    setSelectedTime(null);
    setBookingConfirmed(false);
  }, []);

  const closeBooking = useCallback(() => {
    setBookingDoc(null);
  }, []);

  const confirmBooking = useCallback(() => {
    if (!bookingDoc || !selectedTime) return;

    setBookingConfirmed(true);

    onAddAppointment({
      id: Date.now(),
      doctorName: bookingDoc.name,
      specialty: bookingDoc.specialty,
      time: selectedTime,
      date: 'Tomorrow',
      avatar: bookingDoc.avatar
    });

    setTimeout(() => {
      setBookingDoc(null);
      onNavigate('dashboard');
    }, 2000);
  }, [bookingDoc, selectedTime, onAddAppointment, onNavigate]);

  return {
    bookingDoc,
    selectedTime,
    bookingConfirmed,
    triggerBooking,
    closeBooking,
    setSelectedTime,
    confirmBooking
  };
}

// ---------------------------
// Main Component
// ---------------------------
export default function DoctorsPage({ onNavigate, onAddAppointment }) {
  const [filterSpecialty, setFilterSpecialty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const {
    bookingDoc,
    selectedTime,
    bookingConfirmed,
    triggerBooking,
    closeBooking,
    setSelectedTime,
    confirmBooking
  } = useBookingFlow(onNavigate, onAddAppointment);

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const filteredDoctors = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return DOCTORS_LIST.filter((doc) => {
      const matchesSpecialty = filterSpecialty === 'All' || doc.specialty === filterSpecialty;
      const matchesSearch = doc.name.toLowerCase().includes(query);
      return matchesSpecialty && matchesSearch;
    });
  }, [filterSpecialty, searchQuery]);

  return (
    <div className="doctors-page container animate-fade-in">
      <div className="doctors-page__header">
        <h2 className="doctors-page__title">Book Your Appointment</h2>
        <p className="doctors-page__sub">
          Select a verified professional and schedule your consultation instantly.
        </p>
      </div>

      <SearchBar value={searchQuery} onChange={handleSearchChange} />

      <div className="doctors-page__layout">
        <SpecialtyFilter active={filterSpecialty} onSelect={setFilterSpecialty} />

        <div className="doctors-page__grid">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doc) => (
              <DoctorCard key={doc.id} doctor={doc} onBook={triggerBooking} />
            ))
          ) : (
            <NoDoctorsFound />
          )}
        </div>
      </div>

      {bookingDoc && (
        <BookingModal
          doctor={bookingDoc}
          selectedTime={selectedTime}
          bookingConfirmed={bookingConfirmed}
          onClose={closeBooking}
          onSelectTime={setSelectedTime}
          onConfirm={confirmBooking}
        />
      )}
    </div>
  );
}