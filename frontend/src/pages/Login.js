import React, { useState } from 'react';
import { loginUser } from '../api/api';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await loginUser(formData);
      console.log('Response Data:', response.data);

      const { token } = response.data;
      if (token) {
        localStorage.setItem('accessToken', token);
        alert('Login successful!');
        onLogin();
        navigate('/');
      } else {
        setError('Token not found. Please contact support.');
      }
    } catch (err) {
      console.error('Login Error:', err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
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
        <button type="submit" className="auth-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
