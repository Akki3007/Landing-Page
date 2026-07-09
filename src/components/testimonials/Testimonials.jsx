import React, { useMemo, memo } from 'react';
import './Testimonials.css';

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 17.27 18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21 12 17.27" />
  </svg>
);

const TESTIMONIALS = [
  {
    id: 't1',
    title: 'Fast & Reliable Lab Tests',
    description: 'I scheduled my lab test online and received reports quickly.',
    name: 'John Smith',
    role: 'Business Analyst',
  },
  {
    id: 't2',
    title: 'Consult Online',
    description: 'Convenient online consultations from home.',
    name: 'Vikram Rao',
    role: 'Accountant',
  },
  {
    id: 't3',
    title: 'Insurance Support',
    description: 'Smooth and hassle-free insurance support.',
    name: 'Kavya',
    role: 'Teacher',
  },
  {
    id: 't4',
    title: 'Hospital Care',
    description: 'Quick booking and quality care.',
    name: 'Rahul Sharma',
    role: 'Software Engineer',
  },
];

const TestimonialCard = memo(({ title, description, name, role }) => (
  <div className="testimonial-card">
    <div className="testimonial-card__stars">
      {[...Array(5)].map((_, i) => (
        <StarIcon key={i} />
      ))}
    </div>
    <h4 className="testimonial-card__title">{title}</h4>
    <p className="testimonial-card__quote">{description}</p>
    <div className="testimonial-card__author">
      {/* Replace src with your actual assets */}
      <img 
        src={`https://i.pravatar.cc/150?u=${name}`} 
        alt={name} 
        className="testimonial-card__avatar" 
      />
      <div className="testimonial-card__author-info">
        <span className="testimonial-card__name">{name}</span>
        <span className="testimonial-card__role">{role}</span>
      </div>
    </div>
  </div>
));

export default function Testimonials() {
  const cards = useMemo(() => 
    TESTIMONIALS.map(item => <TestimonialCard key={item.id} {...item} />),
    []
  );

  return (
    <section className="testimonials">
      <div className="testimonials__container">
        <header className="testimonials__header">
          <span className="testimonials__tag">WHAT OUR PATIENTS SAY</span>
          <h2 className="testimonials__title">Trusted by Millions</h2>
          <p className="testimonials__sub">
            From booking to recovery, we make healthcare simple, accessible and personalized for you.
          </p>
        </header>
        <div className="testimonials__grid">
          {cards}
        </div>
      </div>
    </section>
  );
}