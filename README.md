# Travancore Finance — Website & Admin Enquiry System

A MERN-stack project for Travancore Finance: a public marketing website with a
customer enquiry form, plus a password-protected admin panel for viewing
submitted enquiries.

> **Frontend status:** folder structure, routing, components, and API layer
> are scaffolded with placeholders. Visual design/UI implementation is a
> separate task.
>
> **Backend status:** fully implemented and production-oriented (validation,
> rate limiting, secure admin auth, centralized error handling, etc.).

---

## 1. Project Overview

- Public site: Home, About, Our Services, Blog, Contact
- Contact page includes an enquiry form that is stored in MongoDB
- `/admin` — password-protected dashboard to view submitted enquiries
- No CRM, payments, or user-management features — enquiry collection and
  viewing only, by design

## 2. Technology Stack

| Layer          | Technology                                   |
|----------------|-----------------------------------------------|
| Frontend       | React 18 (Vite), React Router                 |
| Backend        | Node.js, Express.js                            |
| Database       | MongoDB + Mongoose                             |
| Auth           | bcrypt password hash + JWT in HTTP-only cookie |
| Security       | Helmet, CORS, rate limiting, input validation, Mongo sanitization |

## 3. Folder Structure

```
travancore-finance/
├── frontend/            React app (structure + placeholders)
│   └── src/
│       ├── components/  Reusable UI components
│       ├── layouts/     MainLayout (public site shell)
│       ├── pages/       Home, About, Services, Blog, Contact
│       ├── admin/       AdminLogin, AdminDashboard, Enquiries
│       ├── services/api Axios client + auth/enquiry API calls
│       ├── routes/      React Router route definitions
│       ├── hooks/       useAuth, useEnquiryForm
│       ├── constants/   routes, services, blog posts, company info
│       └── utils/       validators, formatDate
│
├── backend/             Fully implemented Express API
│   └── src/
│       ├── config/      MongoDB connection
│       ├── controllers/ authController, enquiryController
│       ├── models/      Enquiry (Mongoose schema)
│       ├── routes/      authRoutes, enquiryRoutes, adminRoutes
│       ├── middleware/  auth, error, rate-limit, validation
│       ├── utils/       asyncHandler, ApiError, generateHash, parseDuration
│       ├── app.js       Express app (middleware + routes)
│       └── server.js    Entry point (connects DB, starts server)
│
└── README.md
```

## 4. Installation

Requires **Node.js 18+** and a running **MongoDB** instance (local or Atlas).

```bash
git clone <repo-url> travancore-finance
cd travancore-finance
```

## 5. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env   # set VITE_API_BASE_URL if different from default
```

## 6. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env` and fill in:
- `MONGODB_URI`
- `JWT_SECRET` (long random string)
- `ADMIN_PASSWORD_HASH` (see step 9 below)
- `CLIENT_URL` (your frontend origin)

## 7. MongoDB Setup

- **Local:** install MongoDB Community Server, then use
  `MONGODB_URI=mongodb://127.0.0.1:27017/travancore_finance`
- **Atlas (hosted):** create a free cluster, create a database user, and use
  the provided `mongodb+srv://...` connection string as `MONGODB_URI`.
  Make sure the connecting IP is allow-listed.

No manual schema setup is required — Mongoose creates the `Enquiry`
collection automatically on first insert.

## 8. Environment Variables

### Backend (`backend/.env`)

| Variable               | Description                                              |
|-------------------------|-----------------------------------------------------------|
| `PORT`                  | API port (default `5000`)                                 |
| `NODE_ENV`               | `development` or `production`                             |
| `MONGODB_URI`            | MongoDB connection string                                  |
| `ADMIN_PASSWORD_HASH`    | bcrypt hash of the admin password (never the plaintext)   |
| `JWT_SECRET`             | Long random secret used to sign admin session tokens       |
| `AUTH_SESSION_EXPIRY`    | Session lifetime, e.g. `1h`, `30m`, `1d`                   |
| `CLIENT_URL`             | Frontend origin allowed by CORS                            |

### Frontend (`frontend/.env`)

| Variable               | Description                          |
|--------------------------|---------------------------------------|
| `VITE_API_BASE_URL`      | Base URL of the backend API           |

`.env` files are git-ignored in both `frontend/` and `backend/` — never
commit real secrets.

## 9. Admin Password Hash Generation

The admin password is never stored in plaintext or hardcoded anywhere.
Generate a bcrypt hash locally and paste it into `backend/.env`:

```bash
cd backend
npm run generate:hash -- "YourStrongPassword123!"
```

This prints a line like:

```
ADMIN_PASSWORD_HASH=$2a$12$...........................................
```

Copy that into `backend/.env`. To change the password later, just
regenerate the hash with a new password and update the `.env` value —
no code changes or database migration needed.

## 10. Running the Frontend

```bash
cd frontend
npm run dev
```

Runs on `http://localhost:5173` by default.

## 11. Running the Backend

```bash
cd backend
npm run dev     # nodemon, auto-restarts on changes
# or
npm start       # plain node, for production
```

Runs on `http://localhost:5000` by default. Check `GET /api/health` to
confirm it's up.

## 12. API Endpoints

| Method | Endpoint                | Access  | Description                        |
|--------|--------------------------|---------|--------------------------------------|
| GET    | `/api/health`             | Public  | Health check                        |
| POST   | `/api/enquiries`          | Public  | Submit a contact/enquiry form       |
| POST   | `/api/auth/login`         | Public  | Admin login (rate-limited)          |
| POST   | `/api/auth/logout`        | Public  | Clears the admin session cookie     |
| GET    | `/api/admin/enquiries`    | Admin   | List all enquiries (auth required)  |

All `/api/admin/*` routes require a valid session (HTTP-only cookie set by
`/api/auth/login`).

## 13. Security Considerations

- Admin password is stored only as a bcrypt hash in an environment
  variable — never in the database, frontend, or source code.
- Admin sessions use a JWT stored in an **HTTP-only, SameSite=Strict**
  cookie (`secure` in production) — never `localStorage`.
- Login endpoint is rate-limited to slow down brute-force attempts and
  always returns a generic "Invalid credentials." message.
- All admin API routes are protected by `requireAdminAuth` middleware;
  the `/admin` and `/admin/dashboard` frontend routes are **not** a
  security boundary by themselves — the backend enforces access control
  regardless of what the client does.
- Enquiry submission is public but validated (express-validator),
  size-limited, and rate-limited.
- `express-mongo-sanitize` strips NoSQL-injection payloads from
  `req.body`/`query`/`params`.
- Helmet sets standard security headers; CORS is restricted to
  `CLIENT_URL` with credentials support (no `origin: "*"`).
- Centralized error handler never returns stack traces, connection
  strings, secrets, or internal file paths to the client.
- `.env` is git-ignored in both `frontend/` and `backend/`.

## 14. Production Deployment Notes

- Set `NODE_ENV=production` and use a strong, unique `JWT_SECRET` and
  `ADMIN_PASSWORD_HASH`.
- Serve the frontend build (`npm run build` in `frontend/`) via a static
  host or CDN, and point `CLIENT_URL` (backend) / `VITE_API_BASE_URL`
  (frontend) at the real production domains.
- Run the backend behind HTTPS (required for `secure` cookies to be sent).
- Use a managed MongoDB instance (e.g. Atlas) with network access
  restricted to the backend's IP(s).
- Consider putting the backend behind a reverse proxy (Nginx) or a
  platform (Render, Railway, etc.) that handles TLS termination.
- Rotate `JWT_SECRET` and the admin password periodically; rotating the
  secret invalidates all existing admin sessions immediately.
