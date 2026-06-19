import React from 'react';
import { useAppContext } from '../../context/AppContext';

const TaskCard = ({ task, isMini = false, onClick, canAct }) => {
  const { updateTask, deleteTask, currentUser, users, flights } = useAppContext();
  
  const user = users[task.assignedTo];
  const flight = flights.find(f => f.id === task.flight);
  const checkPct = task.checklist.length ? Math.round((task.checkDone.filter(Boolean).length / task.checklist.length) * 100) : 0;

  const handleStatusUpdate = (e, newStatus) => {
    e.stopPropagation();
    let updatedTask = { ...task, status: newStatus };
    if (newStatus === 'done') {
      updatedTask.checkDone = task.checkDone.map(() => true);
    } else if (newStatus === 'in-progress' && task.status === 'pending') {
      updatedTask.startTime = Date.now(); // Optional tracking for timer
    }
    updateTask(updatedTask);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Delete this task?')) {
      deleteTask(task.id);
    }
  };

  const handleToggleCheck = (e, idx) => {
    e.stopPropagation();
    if (!canAct) return;
    const newCheckDone = [...task.checkDone];
    newCheckDone[idx] = !newCheckDone[idx];
    
    let newStatus = task.status;
    if (newCheckDone.every(Boolean)) newStatus = 'done';
    else if (newCheckDone.some(Boolean)) newStatus = 'in-progress';
    
    updateTask({ ...task, checkDone: newCheckDone, status: newStatus });
  };

  if (isMini) {
    return (
      <div 
        className={`task-card ${task.priority === 'urgent' ? 'urgent-card' : ''}`} 
        style={{ cursor: 'pointer' }} 
        onClick={onClick}
      >
        <div className="task-title">{task.title}</div>
        <div className="task-meta">
          <span className={`badge badge-${task.status === 'done' ? 'done' : task.status === 'in-progress' ? 'progress' : 'pending'}`}>
            {task.status}
          </span>
          {task.priority === 'urgent' && <span className="badge badge-urgent">Urgent</span>}
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${checkPct}%` }}></div>
        </div>
        <div style={{ fontSize: '11px', color: 'var(--muted)' }}>
          {checkPct}% · {task.checklist.length} checklist items
        </div>
      </div>
    );
  }

  const visibleItems = task.checklist.slice(0, 3);
  const moreItemsCount = task.checklist.length - 3;

  return (
    <div className={`task-card ${task.priority === 'urgent' ? 'urgent-card' : ''}`}>
      <div className="task-top">
        <div className="task-title-wrap">
          <div className="task-title">{task.title}</div>
          <div className="task-meta">
            <span className={`badge badge-${task.status === 'done' ? 'done' : task.status === 'in-progress' ? 'progress' : 'pending'}`}>
              {task.status}
            </span>
            {task.priority === 'urgent' && <span className="badge badge-urgent">🔴 Urgent</span>}
            <span>📁 {task.cat}</span>
            {flight && <span>✈ {flight.num}</span>}
            {task.due && <span>🕐 {task.due}</span>}
            {task.duration && <span>⏱ {task.duration}min</span>}
          </div>
        </div>
      </div>
      
      {task.desc && <div className="task-desc">{task.desc}</div>}
      
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${checkPct}%` }}></div>
      </div>
      <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '.75rem' }}>
        {checkPct}% complete ({task.checkDone.filter(Boolean).length}/{task.checklist.length} items)
      </div>
      
      <div className="checklist">
        {visibleItems.map((c, i) => (
          <div key={i} className={`check-item ${task.checkDone[i] ? 'done-item' : ''}`} onClick={(e) => handleToggleCheck(e, i)}>
            <input type="checkbox" checked={task.checkDone[i]} readOnly disabled={!canAct} />
            <span>{c}</span>
          </div>
        ))}
        {moreItemsCount > 0 && <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>+{moreItemsCount} more items…</div>}
      </div>
      
      <hr className="divider" />
      
      <div className="task-footer">
        <div className="task-assignee">
          <div className="mini-avatar">{user ? user.initials : '?'}</div>
          <span>{user ? user.name : 'Unknown'}</span>
        </div>
        <div className="task-actions">
          <button className="btn btn-secondary btn-sm" onClick={onClick}>Details</button>
          
          {canAct && task.status !== 'done' && (
            task.status === 'pending' ? (
              <button className="btn btn-primary btn-sm" onClick={(e) => handleStatusUpdate(e, 'in-progress')}>▶ Start</button>
            ) : (
              <button className="btn btn-primary btn-sm" onClick={(e) => handleStatusUpdate(e, 'done')}>✓ Done</button>
            )
          )}
          
          {currentUser.role === 'supervisor' && task.status !== 'done' && (
            <button className="btn btn-danger btn-sm" onClick={handleDelete}>✕</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
