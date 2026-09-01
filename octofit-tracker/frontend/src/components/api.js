/**
 * Shared API helpers for the Octofit Tracker presentation tier.
 *
 * The backend (logic tier) runs on port 8000 inside the GitHub Codespace.
 * `VITE_CODESPACE_NAME` must be defined (e.g. in `.env.local`) so the app can
 * build URLs like: https://<codespace-name>-8000.app.github.dev/api/<resource>/
 *
 * If `VITE_CODESPACE_NAME` is unset we fall back to localhost to avoid
 * broken `https://undefined-8000.app.github.dev` URLs.
 */

export async function fetchList(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  const data = await response.json();
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  const firstArray = Object.values(data ?? {}).find((v) => Array.isArray(v));
  return firstArray ?? [];
}
