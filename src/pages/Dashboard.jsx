import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import DashboardCards from '../components/dashboard/DashboardCards';
import TaskCard from '../components/tasks/TaskCard';
import ModalComponent from '../components/common/ModalComponent';
import ChecklistComponent from '../components/tasks/ChecklistComponent';
import TimerComponent from '../components/common/TimerComponent';

const Dashboard = () => {
  const { currentUser, tasks, updateTask } = useAppContext();
  const navigate = useNavigate();
  const [selectedTask, setSelectedTask] = useState(null);

  const myTasks = currentUser.role === 'supervisor' ? tasks : tasks.filter(t => t.assignedTo === currentUser.id);
  const activeTasks = myTasks.filter(t => t.status !== 'done').slice(0, 4);
  const recentActivity = [...tasks].sort((a, b) => b.postedAt - a.postedAt).slice(0, 8);

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

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning ☀️';
    if (h < 17) return 'Good afternoon 🌤️';
    return 'Good evening 🌙';
  };

  return (
    <div className="page active">
      <div className="page-header flex jc-between ai-center wrap gap12">
        <div>
          <h1 className="page-title">{getGreeting()}, {currentUser.name.split(' ')[0]}!</h1>
          <p className="page-desc">{currentUser.role === 'supervisor' ? 'Full operations overview' : 'Your assigned tasks for today'}</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/post-task')}>＋ New Task</button>
      </div>

      <DashboardCards tasks={myTasks} />

      <div className="two-col">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Active Tasks</div>
            <span className="badge badge-progress">{activeTasks.length}</span>
          </div>
          <div className="tasks-list">
            {activeTasks.length > 0 ? (
              activeTasks.map(t => (
                <TaskCard key={t.id} task={t} isMini={true} onClick={() => setSelectedTask(t)} />
              ))
            ) : (
              <div className="empty-state">
                <div className="empty-icon">🎉</div>
                <p>All caught up!</p>
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Recent Activity</div>
          </div>
          <div>
            {recentActivity.map(t => (
              <div key={t.id} className="flex ai-center gap12" style={{ padding: '.6rem 0', borderBottom: '1px solid var(--border)' }}>
                <div className={`dot dot-${t.status === 'done' ? 'done' : t.priority === 'urgent' ? 'urgent' : t.status === 'in-progress' ? 'progress' : 'pending'}`}></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.title}</div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)' }}>{t.cat}</div>
                </div>
                <span className={`badge badge-${t.status === 'done' ? 'done' : t.status === 'in-progress' ? 'progress' : 'pending'}`}>{t.status}</span>
              </div>
            ))}
          </div>
        </div>
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
              {selectedTask.status === 'in-progress' && <TimerComponent durationMinutes={selectedTask.duration} startTime={selectedTask.startTime || Date.now() - 100000} />}
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

export default Dashboard;
