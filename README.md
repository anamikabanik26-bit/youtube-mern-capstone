# YouTube Clone — MERN Stack Capstone

A full-stack YouTube-style video application built with MongoDB, Express, React and Node.js. It is organized as separate `frontend` and `backend` applications and uses ES Modules (not CommonJS), Vite (not Create React App), and JWT authentication.

## Features implemented
- Responsive YouTube-inspired header, toggleable sidebar, video grid and category chips (8 categories, 6+ as required).
- Search videos by title and filter by category.
- User registration and login with validation, bcrypt password hashing, JWT and protected API routes.
- Video player page with description, view count, like/dislike, and comment create/read/edit/delete.
- Channel creation and editing; upload, edit and delete videos from Studio.
- MongoDB models for users, channels, videos and comments.
- API request logging, input validation, useful HTTP errors, and a health endpoint.
- Seed script with sample videos so the home page has content.

## Requirements
- Node.js 18 or later
- MongoDB local instance or MongoDB Atlas connection string

## Setup
1. Extract the ZIP and open the `YouTube_MERN_Capstone` folder in VS Code.
2. Start MongoDB locally, or create a MongoDB Atlas database.
3. In a terminal:
   ```bash
   cd backend
   npm install
   ```
4. Copy `backend/.env.example` to `backend/.env`. Set `MONGODB_URI` and replace `JWT_SECRET` with a long random secret. Never upload `.env` to GitHub.
5. Seed sample content:
   ```bash
   npm run seed
   ```
6. Start the backend in that terminal:
   ```bash
   npm run dev
   ```
   API health check: `http://localhost:5000/api/health`
7. Open a second terminal:
   ```bash
   cd frontend
   npm install
   ```
8. Copy `frontend/.env.example` to `frontend/.env` if your API is not at the default URL, then run:
   ```bash
   npm run dev
   ```
9. Open the Vite URL printed in the terminal, normally `http://localhost:5173`.

## Demo account
After seeding: `demo@example.com` / `Demo123!`. Change or delete this demo account before deploying publicly.

## Main routes
### Frontend
- `/` — home/search/category filters
- `/register`, `/login` — account creation and login
- `/watch/:id` — video player and comment actions
- `/channel` — create/edit your channel
- `/channel/:id` — public channel page
- `/studio` — upload/edit/delete your videos

### Backend API
- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- `GET /api/videos?search=&category=`; `GET /api/videos/:id`
- `POST /api/videos`; `PATCH /api/videos/:id`; `DELETE /api/videos/:id`
- `POST /api/videos/:id/like`; `POST /api/videos/:id/dislike`
- `POST /api/channels`; `GET /api/channels/mine`; `GET /api/channels/:id`; `PATCH /api/channels/:id`
- `POST /api/comments/:videoId`; `PATCH /api/comments/:id`; `DELETE /api/comments/:id`
- `GET /api/health`

Protected endpoints require `Authorization: Bearer <token>`.

## Testing checklist
See [`docs/TESTING_CHECKLIST.md`](docs/TESTING_CHECKLIST.md) for manual tests. Before submission, test the project locally, capture your own screenshots, record a short demo video, and add your GitHub repository URL to the README. Do not submit `node_modules` or real secrets.

## Submission checklist from the assignment brief
- [ ] Frontend and backend included
- [ ] MongoDB connection and seed data verified
- [ ] Register/login/JWT tested
- [ ] Search and at least six category filters tested
- [ ] Video player, likes/dislikes and comment CRUD tested
- [ ] Channel creation and video CRUD tested
- [ ] Responsive layout checked on mobile/tablet/desktop
- [ ] GitHub repository includes meaningful commit history (assignment requests at least 30 commits)
- [ ] Screenshots and a short demo video prepared

This project is a starter implementation for learning and must be run and tested in your own environment before submission. Verify video URLs and MongoDB configuration locally.
project setup and testinig instructions.

## Backend Setup

1. Open the backend folder.
2. Run npm install.
3. Configure environment variables in .env.
4. Start the backend server using npm run dev.

## Backend Setup

1. Open the backend folder.
2. Run npm install.
3. Configure environment variables in .env.
4. Start the backend server using npm run dev.