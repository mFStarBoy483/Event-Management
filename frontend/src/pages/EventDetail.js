import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EventDetail.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(response.data);
      } catch (err) {
        setError('Failed to load event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return <div className="text-white text-center mt-20">Loading event details...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-20">{error}</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen text-white">
      <div className="bg-gray-800 bg-opacity-80 p-8 rounded-lg shadow-lg w-3/4 max-w-4xl">
        <div className="flex flex-col lg:flex-row">
          <img
            src={event.imageUrl || 'https://via.placeholder.com/600x400'}
            alt={event.name}
            className="rounded-lg w-full lg:w-1/2 h-60 object-cover mb-6 lg:mb-0 lg:mr-6"
          />
          <div className="flex flex-col justify-between">
            <h2 className="text-3xl font-bold mb-4">{event.name}</h2>
            <p className="text-lg mb-2">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
              Event Date: {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="text-lg mb-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
              Location: {event.location || 'TBD'}
            </p>
            <p className="mb-4">{event.description || 'No description available.'}</p>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded mt-4 flex items-center justify-center">
              <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
              Join Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
