import React from 'react';
import { useAppContext } from '../../context/AppContext';

const FlightTable = () => {
  const { flights, tasks } = useAppContext();

  const statusColors = {
    'On Ground': 'badge-progress',
    'Boarding': 'badge-done',
    'Delayed': 'badge-urgent',
    'Scheduled': 'badge-pending'
  };

  return (
    <div className="card">
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Flight</th>
              <th>Route</th>
              <th>Arrival</th>
              <th>Departure</th>
              <th>Gate</th>
              <th>Status</th>
              <th>Tasks</th>
            </tr>
          </thead>
          <tbody>
            {flights.map(f => {
              const flightTasks = tasks.filter(t => t.flight === f.id);
              const doneTasks = flightTasks.filter(t => t.status === 'done').length;

              return (
                <tr key={f.id}>
                  <td><strong>{f.num}</strong></td>
                  <td>{f.route}</td>
                  <td>{f.arrival}</td>
                  <td>{f.departure}</td>
                  <td>
                    <span style={{ background: 'rgba(255,255,255,.06)', padding: '3px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}>
                      {f.gate}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${statusColors[f.status] || 'badge-pending'}`}>
                      {f.status}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                      {doneTasks}/{flightTasks.length} done
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlightTable;
