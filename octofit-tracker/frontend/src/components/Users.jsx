import { useEffect, useState } from 'react';
import { fetchList } from './api.js';

// VITE_CODESPACE_NAME must be defined (see .env.local). Falls back to
// 'your-codespace-name' to avoid broken `https://undefined-8000...` URLs.
const API_URL = `https://${import.meta.env.VITE_CODESPACE_NAME || 'your-codespace-name'}-8000.app.github.dev/api/users/`;

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchList(API_URL)
      .then(setUsers)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id ?? user.id}>
              <td>{user.username}</td>
              <td>{user.email ?? '—'}</td>
              <td>{user.team?.name ?? user.team ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
