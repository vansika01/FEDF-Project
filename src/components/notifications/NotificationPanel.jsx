import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { X, CheckCircle } from 'lucide-react';

const NotificationPanel = ({ isOpen, onClose }) => {
  const { notifications, markAllNotifsRead } = useAppContext();

  return (
    <div id="notif-panel" className={isOpen ? 'open' : ''}>
      <div className="flex jc-between ai-center" style={{ marginBottom: '1rem' }}>
        <div style={{ fontFamily: 'var(--syne)', fontWeight: 700, fontSize: '1rem' }}>Notifications</div>
        <div className="flex gap8">
          <button className="btn btn-secondary btn-sm" onClick={markAllNotifsRead}>
            <CheckCircle size={14} /> Mark all read
          </button>
          <button className="btn-icon" onClick={onClose} aria-label="Close Notifications">
            <X size={16} />
          </button>
        </div>
      </div>
      
      <div id="notif-list">
        {notifications.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <p>No notifications yet</p>
          </div>
        ) : (
          notifications.map(notif => (
            <div key={notif.id} className={`notif-item ${!notif.read ? 'unread' : ''}`}>
              <div className="notif-title">{notif.title}</div>
              <div className="notif-body">{notif.body}</div>
              <div className="notif-time">{notif.time}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
