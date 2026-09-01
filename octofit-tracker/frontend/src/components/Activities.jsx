import { useEffect, useState } from 'react';
import { fetchList } from './api.js';

// VITE_CODESPACE_NAME must be defined (see .env.local). Falls back to
// 'your-codespace-name' to avoid broken `https://undefined-8000...` URLs.
const API_URL = `https://${import.meta.env.VITE_CODESPACE_NAME || 'your-codespace-name'}-8000.app.github.dev/api/activities/`;

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchList(API_URL)
      .then(setActivities)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Activities</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Type</th>
            <th>Duration (min)</th>
            <th>Distance (km)</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity._id ?? activity.id}>
              <td>{activity._id ?? activity.id}</td>
              <td>{activity.user?.username ?? activity.user ?? '—'}</td>
              <td>{activity.activity_type}</td>
              <td>{activity.duration}</td>
              <td>{activity.distance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Activities;
