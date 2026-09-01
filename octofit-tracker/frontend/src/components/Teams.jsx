import { useEffect, useState } from 'react';
import { fetchList } from './api.js';

// VITE_CODESPACE_NAME must be defined (see .env.local). Falls back to
// 'your-codespace-name' to avoid broken `https://undefined-8000...` URLs.
const API_URL = `https://${import.meta.env.VITE_CODESPACE_NAME || 'your-codespace-name'}-8000.app.github.dev/api/teams/`;

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchList(API_URL)
      .then(setTeams)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Teams</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Members</th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team._id ?? team.id}>
              <td>{team.name}</td>
              <td>
                {Array.isArray(team.members)
                  ? team.members.map((m) => m?.username ?? m).join(', ')
                  : '—'}
              </td>
              <td>{team.total_points ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Teams;
