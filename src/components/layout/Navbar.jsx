import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Bell, LogOut, Menu, X } from 'lucide-react';
import NotificationPanel from '../notifications/NotificationPanel';

const Navbar = ({ toggleSidebar }) => {
  const { currentUser, logout, notifications } = useAppContext();
  const [notifOpen, setNotifOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!currentUser) return null;

  return (
    <>
      <div id="topbar">
        <div className="flex ai-center gap12">
          <button className="btn-icon" onClick={toggleSidebar} style={{ display: 'none' /* handled by media query in a real app or left for mobile */ }} aria-label="Menu">
            <Menu size={18} />
          </button>
          <div className="topbar-logo">
            ✈ GCOMS <span>● {currentUser.role === 'supervisor' ? 'Supervisor' : 'Crew'}</span>
          </div>
        </div>
        
        <div className="topbar-right">
          <div className="notif-wrap">
            <div className="btn-icon" onClick={() => setNotifOpen(true)} title="Notifications">
              <Bell size={16} />
              {unreadCount > 0 && <div className="notif-count">{unreadCount}</div>}
            </div>
          </div>
          
          <div className="user-chip">
            <div className="user-avatar">{currentUser.initials}</div>
            <div>
              <div className="user-name-chip">{currentUser.name}</div>
              <div className="user-role-chip">{currentUser.role === 'supervisor' ? 'Supervisor' : 'Ground Crew'}</div>
            </div>
          </div>
          
          <button className="btn btn-secondary btn-sm" onClick={logout}>
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>
      <NotificationPanel isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
    </>
  );
};

export default Navbar;
