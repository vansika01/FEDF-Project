import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const PostTask = () => {
  const { users, flights, addTask, currentUser } = useAppContext();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    cat: '',
    priority: 'normal',
    assignTo: '',
    flight: '',
    due: '',
    duration: '',
    desc: '',
    checklist: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.cat || !formData.assignTo) {
      alert('Fill all required fields');
      return;
    }

    const checklistArray = formData.checklist.trim() 
      ? formData.checklist.split('\n').map(s => s.trim()).filter(Boolean) 
      : ['Complete task'];

    const newTask = {
      id: 't' + Date.now(),
      title: formData.title.trim(),
      cat: formData.cat,
      priority: formData.priority,
      status: 'pending',
      assignedTo: formData.assignTo,
      flight: formData.flight || null,
      due: formData.due || null,
      duration: parseInt(formData.duration) || null,
      desc: formData.desc.trim(),
      checklist: checklistArray,
      checkDone: checklistArray.map(() => false),
      postedBy: currentUser.id,
      postedAt: Date.now()
    };

    addTask(newTask);
    alert('Task posted successfully!');
    navigate('/all-tasks');
  };

  const crewMembers = Object.values(users).filter(u => u.role === 'crew');

  return (
    <div className="page active">
      <div className="page-header">
        <h1 className="page-title">Post New Task</h1>
        <p className="page-desc">Create and assign a ground handling task</p>
      </div>
      
      <div className="card" style={{ maxWidth: '600px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Task Title *</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Aircraft Cabin Cleaning — AI6201" required />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Category *</label>
              <select name="cat" value={formData.cat} onChange={handleChange} required>
                <option value="">Select category</option>
                <option>Aircraft Cleaning</option><option>Fueling</option><option>Catering</option>
                <option>Baggage Handling</option><option>Safety Inspection</option>
                <option>De-icing</option><option>Pushback</option><option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Priority *</label>
              <select name="priority" value={formData.priority} onChange={handleChange}>
                <option value="normal">Normal</option>
                <option value="urgent">🔴 Urgent</option>
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Assign To *</label>
              <select name="assignTo" value={formData.assignTo} onChange={handleChange} required>
                <option value="">Select crew member</option>
                {crewMembers.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Flight</label>
              <select name="flight" value={formData.flight} onChange={handleChange}>
                <option value="">No specific flight</option>
                {flights.map(f => <option key={f.id} value={f.id}>{f.num} ({f.route})</option>)}
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Due Time</label>
              <input type="time" name="due" value={formData.due} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Est. Duration (min)</label>
              <input type="number" name="duration" value={formData.duration} onChange={handleChange} placeholder="e.g. 45" min="5" max="480" />
            </div>
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea name="desc" value={formData.desc} onChange={handleChange} placeholder="Describe what needs to be done…"></textarea>
          </div>
          
          <div className="form-group">
            <label>Checklist Items (one per line)</label>
            <textarea name="checklist" value={formData.checklist} onChange={handleChange} placeholder="Check oxygen levels&#10;Clean cabin seats&#10;Dispose waste bags&#10;Report completion" style={{ minHeight: '110px' }}></textarea>
          </div>
          
          <button type="submit" className="btn btn-primary btn-full">✈ Post Task</button>
        </form>
      </div>
    </div>
  );
};

export default PostTask;
