import React from 'react';

const DashboardCards = ({ tasks }) => {
  const pending = tasks.filter(t => t.status === 'pending').length;
  const inProg = tasks.filter(t => t.status === 'in-progress').length;
  const done = tasks.filter(t => t.status === 'done').length;
  const urgent = tasks.filter(t => t.priority === 'urgent' && t.status !== 'done').length;

  return (
    <div className="stats-row" id="stats-row">
      <div className="stat-card c-blue">
        <div className="stat-num">{pending}</div>
        <div className="stat-label">Pending</div>
      </div>
      <div className="stat-card c-accent">
        <div className="stat-num">{inProg}</div>
        <div className="stat-label">In Progress</div>
      </div>
      <div className="stat-card c-success">
        <div className="stat-num">{done}</div>
        <div className="stat-label">Completed</div>
      </div>
      <div className="stat-card c-warn">
        <div className="stat-num">{urgent}</div>
        <div className="stat-label">Urgent</div>
      </div>
    </div>
  );
};

export default DashboardCards;
