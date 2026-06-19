import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import TaskCard from '../components/tasks/TaskCard';
import ModalComponent from '../components/common/ModalComponent';
import ChecklistComponent from '../components/tasks/ChecklistComponent';

const MyTasks = () => {
  const { tasks, currentUser, updateTask } = useAppContext();
  const [filter, setFilter] = useState('all');
  const [selectedTask, setSelectedTask] = useState(null);

  let list = tasks.filter(t => t.assignedTo === currentUser.id);
  if (filter !== 'all') {
    list = list.filter(t => t.status === filter);
  }

  const handleToggleCheck = (idx) => {
    if (!selectedTask || selectedTask.assignedTo !== currentUser.id) return;
    
    const newCheckDone = [...selectedTask.checkDone];
    newCheckDone[idx] = !newCheckDone[idx];
    
    let newStatus = selectedTask.status;
    if (newCheckDone.every(Boolean)) newStatus = 'done';
    else if (newCheckDone.some(Boolean)) newStatus = 'in-progress';
    
    const updatedTask = { ...selectedTask, checkDone: newCheckDone, status: newStatus };
    setSelectedTask(updatedTask);
    updateTask(updatedTask);
  };

  return (
    <div className="page active">
      <div className="page-header">
        <h1 className="page-title">My Tasks</h1>
        <p className="page-desc">Tasks assigned to you — update status and check items off</p>
      </div>
      
      <div className="filter-bar">
        <div className={`filter-pill ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</div>
        <div className={`filter-pill ${filter === 'pending' ? 'active' : ''}`} onClick={() => setFilter('pending')}>Pending</div>
        <div className={`filter-pill ${filter === 'in-progress' ? 'active' : ''}`} onClick={() => setFilter('in-progress')}>In Progress</div>
        <div className={`filter-pill ${filter === 'done' ? 'active' : ''}`} onClick={() => setFilter('done')}>Done</div>
      </div>
      
      <div className="tasks-list">
        {list.length > 0 ? (
          list.map(t => (
            <TaskCard 
              key={t.id} 
              task={t} 
              canAct={true} 
              onClick={() => setSelectedTask(t)} 
            />
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <p>Nothing here yet.</p>
          </div>
        )}
      </div>

      <ModalComponent isOpen={!!selectedTask} onClose={() => setSelectedTask(null)} title={selectedTask?.title}>
        {selectedTask && (
          <>
            <div className="flex gap8 wrap" style={{ marginBottom: '1rem' }}>
              <span className={`badge badge-${selectedTask.status === 'done' ? 'done' : selectedTask.status === 'in-progress' ? 'progress' : 'pending'}`}>
                {selectedTask.status}
              </span>
              {selectedTask.priority === 'urgent' && <span className="badge badge-urgent">🔴 Urgent</span>}
              <span className="badge badge-crew">📁 {selectedTask.cat}</span>
            </div>
            
            {selectedTask.desc && <p style={{ color: 'var(--muted)', fontSize: '.875rem', marginBottom: '1rem', lineHeight: 1.6 }}>{selectedTask.desc}</p>}
            
            <hr className="divider" />
            
            <ChecklistComponent 
              checklist={selectedTask.checklist} 
              checkDone={selectedTask.checkDone} 
              canAct={selectedTask.assignedTo === currentUser.id && selectedTask.status !== 'done'}
              onToggleCheck={handleToggleCheck}
            />
          </>
        )}
      </ModalComponent>
    </div>
  );
};

export default MyTasks;
