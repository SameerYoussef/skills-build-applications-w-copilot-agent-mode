import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';

// NOTE: `VITE_CODESPACE_NAME` must be defined for API calls to work.
// Create a `.env.local` file in `octofit-tracker/frontend/` with:
//   VITE_CODESPACE_NAME=<your-codespace-name>
// Without it, the app falls back to localhost (see src/components/api.js).

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
