import { useEffect, useState } from 'react';
import { fetchList } from './api.js';

// VITE_CODESPACE_NAME must be defined (see .env.local). Falls back to
// 'your-codespace-name' to avoid broken `https://undefined-8000...` URLs.
const API_URL = `https://${import.meta.env.VITE_CODESPACE_NAME || 'your-codespace-name'}-8000.app.github.dev/api/workouts/`;

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchList(API_URL)
      .then(setWorkouts)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Workouts</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Suggested For</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout) => (
            <tr key={workout._id ?? workout.id}>
              <td>{workout.name}</td>
              <td>{workout.description ?? '—'}</td>
              <td>{workout.suggested_for ?? workout.level ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Workouts;
