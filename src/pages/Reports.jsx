import React from 'react';
import ReportCard from '../components/reports/ReportCard';

const Reports = () => {
  return (
    <div className="page active">
      <div className="page-header">
        <h1 className="page-title">Reports & Analytics</h1>
        <p className="page-desc">Task completion rates and crew performance overview</p>
      </div>
      <ReportCard />
    </div>
  );
};

export default Reports;
