import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './AttendeesPage.css';

const AttendeesPage = () => {
  const { eventId } = useParams();
  const [eventName, setEventName] = useState('');
  const [attendees, setAttendees] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${eventId}/attendees`);
        setEventName(response.data.eventName);
        setAttendees(response.data.attendees);
      } catch (error) {
        console.error('Error fetching attendees:', error);
        setError('Failed to load attendees. Please try again later.');
      }
    };

    fetchAttendees();
  }, [eventId]);

  return (
    <div className="attendees-page">
      <h2>{eventName || 'Event Name'}</h2>
      {error ? (
        <p className="error-message">{error}</p>
      ) : attendees.length > 0 ? (
        <ul>
          {attendees.map((attendee, index) => (
            <li key={index}>
              <strong>{attendee.name}</strong> ({attendee.email})
            </li>
          ))}
        </ul>
      ) : (
        <p>No attendees registered yet.</p>
      )}
    </div>
  );
};

export default AttendeesPage;
