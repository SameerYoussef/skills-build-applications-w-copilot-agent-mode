# OctoFit Tracker Application

A modern multi-tier fitness tracking application built with React (Vite), Node.js (Express), and MongoDB.

## Architecture

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Port**: 5173
- **Location**: `./frontend`

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Port**: 8000
- **Location**: `./backend`

### Database
- **MongoDB**: Runs on port 27017
- **Database Name**: `octofit_db`

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB running locally (or update connection string in `.env`)

### Installation

#### Backend Setup
```bash
cd backend
npm install
```

#### Frontend Setup
```bash
cd frontend
npm install
```

### Running the Application

#### Start MongoDB (if running locally)
```bash
mongod
```

#### Start Backend Server
```bash
cd backend
npm run dev
```
The backend will run on `http://localhost:8000`

#### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:5173`

### Environment Configuration

#### Backend (.env)
```
PORT=8000
MONGODB_URI=mongodb://localhost:27017/octofit_db
NODE_ENV=development
```

#### Frontend (.env)
```
VITE_API_URL=http://localhost:8000
```

## Available Scripts

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Run production build
- `npm run lint` - Run ESLint

### Frontend
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Project Structure

```
octofit-tracker/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── scripts/
│   │   │   └── seed.ts
│   │   └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env
│   ├── .env.example
│   └── .gitignore
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── .env
│   ├── .env.example
│   └── .gitignore
└── README.md
```

## Development Workflow

1. Ensure MongoDB is running on port 27017
2. Start the backend server (port 8000)
3. Start the frontend development server (port 5173)
4. Open browser to `http://localhost:5173`

## Technology Stack

- **Frontend**: React 19, Vite, TypeScript, Oxlint
- **Backend**: Express.js, TypeScript, Mongoose, Node.js
- **Database**: MongoDB
- **Build**: TypeScript compiler, Vite
- **Linting**: Oxlint (frontend), ESLint (backend)

## Notes

- MongoDB connection defaults to local instance. Update `MONGODB_URI` in `.env` for remote connections.
- Frontend API calls should use `import.meta.env.VITE_API_URL` to reference the backend URL.
- Both applications support hot-reload during development.
