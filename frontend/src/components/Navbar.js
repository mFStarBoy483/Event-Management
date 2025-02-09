import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignInAlt, faUserPlus, faUser, faCalendarPlus, faSignOutAlt, faUsers } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ isAuthenticated, toggleAuth }) => {
  const sampleEventId = '12345'; // Example event ID (Replace with dynamic ID if needed)

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    toggleAuth(false);
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-title">Event Management</h1>
      <div className="navbar-links">
        <Link to="/">
          <FontAwesomeIcon icon={faHome} /> Home
        </Link>
        <Link to={`/attendees/${sampleEventId}`}>
          <FontAwesomeIcon icon={faUsers} /> Attendees
        </Link>
        {!isAuthenticated ? (
          <>
            <Link to="/login">
              <FontAwesomeIcon icon={faSignInAlt} /> Login
            </Link>
            <Link to="/register">
              <FontAwesomeIcon icon={faUserPlus} /> Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/create-event">
              <FontAwesomeIcon icon={faCalendarPlus} /> Create Event
            </Link>
            <Link to="/profile">
              <FontAwesomeIcon icon={faUser} /> Profile
            </Link>
            <button onClick={handleLogout} className="logout-button">
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
