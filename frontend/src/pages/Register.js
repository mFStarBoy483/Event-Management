import React, { useState } from 'react';
import { registerUser } from '../api/api';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css'; // Same CSS used for Login

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await registerUser(formData);
      alert('Registration successful! Redirecting to login...');
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="auth-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
