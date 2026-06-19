import React from 'react';
import { useAppContext } from '../../context/AppContext';

const CrewProfileCard = () => {
  const { currentUser, tasks } = useAppContext();

  if (!currentUser) return null;

  const userTasks = tasks.filter(t => t.assignedTo === currentUser.id);
  const doneTasks = userTasks.filter(t => t.status === 'done').length;
  const completionRate = userTasks.length ? Math.round((doneTasks / userTasks.length) * 100) : 0;

  return (
    <div className="card" style={{ maxWidth: '500px' }}>
      <div className="flex ai-center gap16" style={{ marginBottom: '1.5rem' }}>
        <div className="big-avatar">{currentUser.initials}</div>
        <div>
          <div style={{ fontFamily: 'var(--syne)', fontSize: '1.25rem', fontWeight: 700 }}>{currentUser.name}</div>
          <div style={{ color: 'var(--muted)', fontSize: '.875rem' }}>
            {currentUser.role === 'supervisor' ? 'Operations Supervisor' : 'Ground Crew Member'}
          </div>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{ background: 'rgba(255,255,255,.03)', padding: '1rem', borderRadius: '10px' }}>
          <div style={{ fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '4px' }}>Tasks Assigned</div>
          <div style={{ fontFamily: 'var(--syne)', fontSize: '1.5rem', fontWeight: 700 }}>{userTasks.length}</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,.03)', padding: '1rem', borderRadius: '10px' }}>
          <div style={{ fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '4px' }}>Completion Rate</div>
          <div style={{ fontFamily: 'var(--syne)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--success)' }}>{completionRate}%</div>
        </div>
      </div>
    </div>
  );
};

export default CrewProfileCard;
