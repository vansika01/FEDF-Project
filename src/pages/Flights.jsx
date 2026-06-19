import React from 'react';
import FlightTable from '../components/flights/FlightTable';

const Flights = () => {
  return (
    <div className="page active">
      <div className="page-header">
        <h1 className="page-title">Flight Schedule</h1>
        <p className="page-desc">Active flights requiring ground handling today</p>
      </div>
      <FlightTable />
    </div>
  );
};

export default Flights;
