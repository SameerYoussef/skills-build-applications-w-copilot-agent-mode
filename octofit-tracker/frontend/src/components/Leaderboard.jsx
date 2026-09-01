import { useEffect, useState } from 'react';
import { fetchList } from './api.js';

// VITE_CODESPACE_NAME must be defined (see .env.local). Falls back to
// 'your-codespace-name' to avoid broken `https://undefined-8000...` URLs.
const API_URL = `https://${import.meta.env.VITE_CODESPACE_NAME || 'your-codespace-name'}-8000.app.github.dev/api/leaderboard/`;

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchList(API_URL)
      .then(setEntries)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Team</th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={entry._id ?? entry.id ?? index}>
              <td>{index + 1}</td>
              <td>{entry.user?.username ?? entry.user ?? '—'}</td>
              <td>{entry.team?.name ?? entry.team ?? '—'}</td>
              <td>{entry.total_points ?? entry.points ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
