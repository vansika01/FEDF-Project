import React from 'react';
import { X } from 'lucide-react';

const ModalComponent = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.id === 'modal-overlay') {
      onClose();
    }
  };

  return (
    <div id="modal-overlay" onClick={handleOverlayClick} className="open">
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">{title}</div>
          <button className="close-x" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
