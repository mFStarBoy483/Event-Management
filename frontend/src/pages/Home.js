import React, { useEffect, useState } from 'react';
import { getEvents } from '../api/api';
import EventCard from '../components/EventCard';
import { useNavigate } from 'react-router-dom'; // For navigation
import { FaPlus } from 'react-icons/fa';

const Home = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents();
        setEvents(response.data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };
    fetchEvents();
  }, []);

  const handleCreateEvent = () => {
    navigate('/create-event');
  };

  return (
    <div className="home-container">
      <h1>Upcoming Events</h1>
      <div className="event-list">
        {events.length > 0 ? (
          events.map((event) => <EventCard key={event._id} event={event} />)
        ) : (
          <p>No events found.</p>
        )}
      </div>

      {/* Floating button for adding a new event */}
      <button className="fab" onClick={handleCreateEvent}>
        <FaPlus />
      </button>

      <style jsx="true">{`
        .fab {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          cursor: pointer;
        }
        .fab:hover {
          background-color: #218838;
        }
      `}</style>
    </div>
  );
};

export default Home;
