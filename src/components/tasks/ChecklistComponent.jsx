import React from 'react';

const ChecklistComponent = ({ checklist, checkDone, canAct, onToggleCheck }) => {
  const checkPct = checklist.length ? Math.round((checkDone.filter(Boolean).length / checklist.length) * 100) : 0;
  
  return (
    <>
      <div style={{ fontFamily: 'var(--syne)', fontSize: '.9rem', fontWeight: 700, marginBottom: '.75rem' }}>
        Checklist — {checkPct}%
      </div>
      <div className="progress-bar" style={{ marginBottom: '1rem' }}>
        <div className="progress-fill" style={{ width: `${checkPct}%` }}></div>
      </div>
      <div className="checklist">
        {checklist.map((c, i) => (
          <div 
            key={i} 
            className={`check-item ${checkDone[i] ? 'done-item' : ''}`}
            onClick={() => canAct && onToggleCheck(i)}
            style={{ cursor: canAct ? 'pointer' : 'default' }}
          >
            <input 
              type="checkbox" 
              checked={checkDone[i]} 
              onChange={() => {}} // Controlled by the div click for better UX
              disabled={!canAct}
            />
            <span>{c}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default ChecklistComponent;
