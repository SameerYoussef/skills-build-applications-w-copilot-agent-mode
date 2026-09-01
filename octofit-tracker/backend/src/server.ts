import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 8000;

/**
 * Codespaces-aware API URL configuration.
 *
 * Builds the public API base URL using the CODESPACE_NAME environment
 * variable when available:
 *   https://$CODESPACE_NAME-8000.app.github.dev
 *
 * Falls back to http://localhost:8000 when CODESPACE_NAME is not set,
 * so local development keeps working unchanged.
 */
export function getApiUrl(port: number = PORT): string {
  if (process.env.CODESPACE_NAME) {
    return `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`;
  }
  return `http://localhost:${port}`;
}

export const API_URL = getApiUrl();

export default app;
