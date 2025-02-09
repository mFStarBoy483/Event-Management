import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import EventDetail from './pages/EventDetail';
import CreateEvent from './pages/CreateEvent';
import AttendeesPage from './components/AttendeesPage';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) setIsAuthenticated(true);
  }, []);

  const toggleAuth = (authStatus) => {
    setIsAuthenticated(authStatus);
    if (!authStatus) {
      localStorage.removeItem('accessToken');
    }
  };

  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="App">
        <Navbar isAuthenticated={isAuthenticated} toggleAuth={toggleAuth} />
        <div className="content-wrapper">
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login onLogin={() => toggleAuth(true)} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/event/:id" element={<EventDetail />} />
              <Route path="/create-event" element={<ProtectedRoute element={<CreateEvent />} />} />
              <Route path="/attendees/:eventId" element={<AttendeesPage />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
