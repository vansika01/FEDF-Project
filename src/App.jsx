import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAppContext } from './context/AppContext';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MyTasks from './pages/MyTasks';
import AllTasks from './pages/AllTasks';
import Flights from './pages/Flights';
import PostTask from './pages/PostTask';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import { LayoutDashboard, CheckSquare, ListTodo, Plane, PlusSquare, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const App = () => {
  const { currentUser, loading } = useAppContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'var(--accent)' }}>Loading GCOMS...</div>;
  }

  if (!currentUser) {
    return <Login />;
  }

  return (
    <Router>
      <div id="app" style={{ display: 'flex' }}>
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <div id="main-layout">
          <Sidebar />
          
          <div id="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/my-tasks" element={<MyTasks />} />
              <Route path="/all-tasks" element={<AllTasks />} />
              <Route path="/flights" element={<Flights />} />
              <Route path="/post-task" element={<PostTask />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="mob-nav">
          <NavLink to="/" className={({isActive}) => `mob-nav-item ${isActive ? 'active' : ''}`} end>
            <LayoutDashboard size={18} /><span>Home</span>
          </NavLink>
          <NavLink to="/my-tasks" className={({isActive}) => `mob-nav-item ${isActive ? 'active' : ''}`}>
            <CheckSquare size={18} /><span>Tasks</span>
          </NavLink>
          <NavLink to="/post-task" className={({isActive}) => `mob-nav-item ${isActive ? 'active' : ''}`}>
            <PlusSquare size={18} /><span>Post</span>
          </NavLink>
          <NavLink to="/flights" className={({isActive}) => `mob-nav-item ${isActive ? 'active' : ''}`}>
            <Plane size={18} /><span>Flights</span>
          </NavLink>
          <NavLink to="/profile" className={({isActive}) => `mob-nav-item ${isActive ? 'active' : ''}`}>
            <User size={18} /><span>Profile</span>
          </NavLink>
        </div>
      </div>
    </Router>
  );
};

export default App;
