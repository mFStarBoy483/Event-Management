import React from 'react';

const EventCard = ({ event }) => {
  const handleRegister = (eventId) => {
    alert(`You have registered for: ${event.title}`);
  };

  return (
    <div className="event-card">
      <img
        src={event.image || 'https://via.placeholder.com/300x200'}
        alt={event.title}
        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
      />
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p>
        <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
      </p>

      <button className="register-button" onClick={() => handleRegister(event._id)}>
        Register
      </button>
    </div>
  );
};

export default EventCard;
