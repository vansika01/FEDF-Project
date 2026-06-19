import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { LayoutDashboard, CheckSquare, ListTodo, Plane, PlusSquare, BarChart3, User, LogOut } from 'lucide-react';

const Sidebar = () => {
  const { logout } = useAppContext();

  return (
    <div id="sidebar">
      <div className="nav-section">Main</div>
      
      <NavLink to="/" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} end>
        <LayoutDashboard size={16} /> Dashboard
      </NavLink>
      
      <NavLink to="/my-tasks" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
        <CheckSquare size={16} /> My Tasks
      </NavLink>
      
      <NavLink to="/all-tasks" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
        <ListTodo size={16} /> All Operations
      </NavLink>
      
      <div className="nav-section">Tools</div>
      
      <NavLink to="/flights" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
        <Plane size={16} /> Flights
      </NavLink>
      
      <NavLink to="/post-task" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
        <PlusSquare size={16} /> Post Task
      </NavLink>
      
      <NavLink to="/reports" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
        <BarChart3 size={16} /> Reports
      </NavLink>
      
      <NavLink to="/profile" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
        <User size={16} /> Profile
      </NavLink>
      
      <div className="sidebar-bottom">
        <div className="nav-item" onClick={logout}>
          <LogOut size={16} /> Sign Out
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
