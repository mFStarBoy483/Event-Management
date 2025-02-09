import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateEvent.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    image: null,
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    const eventData = new FormData();
    eventData.append('title', formData.title);
    eventData.append('description', formData.description);
    eventData.append('date', formData.date);
    eventData.append('image', formData.image);

    try {
      const token = localStorage.getItem('accessToken');  // Get token from localStorage

      const response = await fetch(`${API_URL}/api/events`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: eventData,
      });

      if (response.ok) {
        alert('Event created successfully!');
        navigate('/');
      } else {
        const message = (await response.json()).message || response.statusText;
        setError(`Failed to create event: ${message}`);
      }
    } catch (error) {
      console.error('Failed to create event:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="create-event-container">
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Date</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </div>
        <div>
          <label>Image</label>
          <input type="file" name="image" onChange={handleFileChange} required />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
