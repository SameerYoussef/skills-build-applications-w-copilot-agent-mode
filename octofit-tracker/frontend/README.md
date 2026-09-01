# Octofit Tracker — Presentation Tier (React 19 + Vite)

## Setup

```bash
npm install --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/frontend
```

## Required environment variable

`VITE_CODESPACE_NAME` **must** be defined so the app can reach the backend
(logic tier) on port 8000. Create `octofit-tracker/frontend/.env.local`:

```
VITE_CODESPACE_NAME=<your-codespace-name>
```

API endpoints are then built as:

```
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/<component>/
```

If `VITE_CODESPACE_NAME` is unset, components fall back to
`your-codespace-name` to avoid broken `https://undefined-8000...` URLs.

## Response handling

All list views accept both plain JSON arrays and paginated responses
(`{ count, results: [...] }`) via the shared helper in `src/components/api.js`.
