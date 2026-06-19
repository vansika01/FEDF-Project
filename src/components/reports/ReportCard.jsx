import React from 'react';
import { useAppContext } from '../../context/AppContext';

const ReportCard = () => {
  const { tasks, users } = useAppContext();

  const total = tasks.length;
  const done = tasks.filter(t => t.status === 'done').length;
  const pending = tasks.filter(t => t.status === 'pending').length;
  const inProg = tasks.filter(t => t.status === 'in-progress').length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  const crewStats = Object.values(users)
    .filter(u => u.role === 'crew')
    .map(u => {
      const assigned = tasks.filter(t => t.assignedTo === u.id);
      const completed = assigned.filter(t => t.status === 'done').length;
      return {
        user: u,
        assigned: assigned.length,
        completed,
        rate: assigned.length ? Math.round((completed / assigned.length) * 100) : 0
      };
    });

  return (
    <div className="two-col">
      <div className="card">
        <div className="card-header">
          <div className="card-title">Overall Completion</div>
        </div>
        <div className="flex ai-center jc-center" style={{ flexDirection: 'column', padding: '2rem 0' }}>
          <div style={{ fontFamily: 'var(--syne)', fontSize: '3.5rem', fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>{pct}%</div>
          <div style={{ color: 'var(--muted)', marginTop: '.5rem' }}>{done} of {total} tasks completed</div>
          
          <div style={{ width: '100%', marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{pending}</div>
              <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Pending</div>
            </div>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent2)' }}>{inProg}</div>
              <div style={{ fontSize: '11px', color: 'var(--muted)' }}>In Progress</div>
            </div>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--success)' }}>{done}</div>
              <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Done</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Crew Performance</div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Crew Member</th>
                <th>Assigned</th>
                <th>Completed</th>
                <th>Rate</th>
              </tr>
            </thead>
            <tbody>
              {crewStats.map(stat => (
                <tr key={stat.user.id}>
                  <td>
                    <div className="flex ai-center gap8">
                      <div className="mini-avatar">{stat.user.initials}</div>
                      <span style={{ fontWeight: 600 }}>{stat.user.name}</span>
                    </div>
                  </td>
                  <td>{stat.assigned}</td>
                  <td>{stat.completed}</td>
                  <td>
                    <div className="flex ai-center gap8">
                      <div className="progress-bar" style={{ width: '60px', margin: 0 }}>
                        <div className="progress-fill" style={{ width: `${stat.rate}%`, background: stat.rate === 100 ? 'var(--success)' : '' }}></div>
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: 600 }}>{stat.rate}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
