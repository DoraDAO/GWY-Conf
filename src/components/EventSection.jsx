import React, { useState } from 'react';
import './EventSection.css';

const EventSection = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const eventsData = [
    {
      id: 1,
      title: "Award Ceremony & Community Celebration",
      type: "HACKATHON",
      date: "DEC 28, 2025",
    },
    {
      id: 2,
      title: "Hacker House & Demo Day",
      type: "HACKATHON",
      date: "DEC 27, 2025",
    },
    {
      id: 3,
      title: "Apify x DevDay Hackathon",
      type: "HACKATHON",
      date: "DEC 06, 2025",
    },
    {
      id: 4,
      title: "Hyderabad City Build Station",
      type: "BUILD STATION",
      date: "NOV 22, 2025",
    },
  ];

  return (
    <div className="event-container">
     
      <header className="event-header">
        <h1>Events</h1>
        <button className="menu-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </header>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        {['ALL', 'HACKATHONS', 'EVENTS'].map((filter) => (
          <button
            key={filter}
            className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <h2 className="section-title">Past</h2>

      <div className="events-list">
        {eventsData.map((event) => (
          <div key={event.id} className="event-card">
            <div className="event-content">
              <h3 className="event-title">{event.title}</h3>
              
              <div className="event-meta">
                {/* Dynamic styling based on event type */}
                <span className={`event-tag ${event.type === 'HACKATHON' ? 'tag-orange' : 'tag-purple'}`}>
                  {event.type}
                </span>
                
                <span className="event-date">
                  {event.date}
                </span>
              </div>
            </div>

            <div className="event-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventSection;
