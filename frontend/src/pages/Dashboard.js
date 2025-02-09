import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <Link to="/create-event" className="bg-green-500 text-white px-4 py-2 rounded">Create Event</Link>
    </div>
  );
};

export default Dashboard;
