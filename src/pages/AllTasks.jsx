import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import TaskCard from '../components/tasks/TaskCard';
import ModalComponent from '../components/common/ModalComponent';
import ChecklistComponent from '../components/tasks/ChecklistComponent';
import { Search } from 'lucide-react';

const AllTasks = () => {
  const { tasks, currentUser, users, updateTask } = useAppContext();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);

  let list = [...tasks];
  
  if (filter === 'urgent') list = list.filter(t => t.priority === 'urgent');
  else if (filter !== 'all') list = list.filter(t => t.status === filter);
  
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(t => 
      t.title.toLowerCase().includes(q) || 
      t.cat.toLowerCase().includes(q) || 
      (users[t.assignedTo]?.name || '').toLowerCase().includes(q)
    );
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
      <div className="page-header flex jc-between ai-center wrap gap12">
        <div>
          <h1 className="page-title">All Operations</h1>
          <p className="page-desc">Full operations board — all crew tasks and statuses</p>
        </div>
      </div>
      
      <div className="filter-bar">
        <div className="search-wrap">
          <span className="search-icon"><Search size={14} /></span>
          <input 
            type="text" 
            placeholder="Search tasks…" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
          />
        </div>
        <div className={`filter-pill ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</div>
        <div className={`filter-pill ${filter === 'pending' ? 'active' : ''}`} onClick={() => setFilter('pending')}>Pending</div>
        <div className={`filter-pill ${filter === 'in-progress' ? 'active' : ''}`} onClick={() => setFilter('in-progress')}>In Progress</div>
        <div className={`filter-pill ${filter === 'done' ? 'active' : ''}`} onClick={() => setFilter('done')}>Done</div>
        <div className={`filter-pill ${filter === 'urgent' ? 'active' : ''}`} onClick={() => setFilter('urgent')}>🔴 Urgent</div>
      </div>
      
      <div className="tasks-list">
        {list.length > 0 ? (
          list.map(t => (
            <TaskCard 
              key={t.id} 
              task={t} 
              canAct={t.assignedTo === currentUser.id} 
              onClick={() => setSelectedTask(t)} 
            />
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <p>Try a different filter.</p>
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

export default AllTasks;
