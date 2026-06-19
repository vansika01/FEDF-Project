import React, { useState, useEffect } from 'react';

const TimerComponent = ({ durationMinutes, startTime }) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!startTime) return;

    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.floor((now - startTime) / 1000); // seconds
      setElapsed(diff);
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, [startTime]);

  const formatTime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isOvertime = durationMinutes && (elapsed > durationMinutes * 60);

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: isOvertime ? 'var(--danger)' : 'var(--accent)' }}>
      ⏱ {formatTime(elapsed)} {isOvertime && '(Overtime)'}
    </div>
  );
};

export default TimerComponent;
