# Cybersecurity Scenario Manager

Web-based application for managing cybersecurity scenarios.

## Features

- JWT authentication and protected routes
- Create, view, edit, and delete scenarios
- Search, filtering, and pagination
- Dashboard summary statistics
- Difficulty distribution pie chart
- Scenario report with date filtering
- Export scenario report to CSV
- Developer notes
- PostgreSQL database

## Tech Stack

### Backend
- Python 3.13+
- FastAPI
- SQLAlchemy
- PostgreSQL
- Pydantic
- JWT
- Passlib / bcrypt

### Frontend
- React
- Vite
- React Router
- Axios
- Recharts

## Project Structure

```text
cybersecurity-dev-test/
├── backend/
│   ├── app/
│   │   ├── auth/
│   │   ├── models/
│   │   ├── routers/
│   │   ├── schemas/
│   │   ├── database.py
│   │   └── main.py
│   ├── create_admin.py
│   ├── seed_data.py
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## Requirements

Install:

- Python 3.13+
- Node.js and npm
- PostgreSQL
- Git

Check versions:

```powershell
python --version
node --version
npm --version
psql --version
git --version
```

## Installation

### 1. Clone Repository

```powershell
git clone https://github.com/ALamsyahh1412/cybersecuritydeveloper-test.git
cd cybersecurity-dev-test
```

### 2. Setup PostgreSQL

Create an empty database:

```sql
CREATE DATABASE cybersecurity_db;
```

Tables do not need to be created manually. SQLAlchemy automatically creates the required tables when the backend starts.

Main tables:

```text
users
scenarios
notes
```

### 3. Setup Backend

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
```

Create the environment file:

```powershell
Copy-Item .env.example .env
```

Configure `backend/.env`:

```env
DATABASE_URL=postgresql+psycopg2://postgres:YOUR_PASSWORD@localhost:5432/cybersecurity_db
SECRET_KEY=your-secret-key
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

Replace `YOUR_PASSWORD` with the PostgreSQL password.

### 4. Create Database Tables

Start the backend:

```powershell
uvicorn app.main:app --reload
```

SQLAlchemy will automatically create the database tables.

Backend:

```text
http://127.0.0.1:8000
```

API documentation:

```text
http://127.0.0.1:8000/docs
```

Stop the server with `CTRL + C`.

### 5. Create Admin User

```powershell
python create_admin.py
```

Default credentials:

```text
Email: admin@example.com
Password: Admin123!
```

### 6. Seed Sample Data

```powershell
python seed_data.py
```

The script adds sample cybersecurity scenarios and does not create duplicates when run again.

### 7. Run Backend

```powershell
.\venv\Scripts\Activate.ps1
uvicorn app.main:app --reload
```

### 8. Setup and Run Frontend

Open a new terminal:

```powershell
cd cybersecurity-dev-test\frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

## Application Flow

```text
Login
  │
  ▼
Dashboard
  ├── Summary Statistics
  ├── Difficulty Pie Chart
  └── Scenario Management
       ├── Search
       ├── Filter
       ├── Pagination
       ├── Create
       ├── Edit
       └── Delete

Reports
  ├── Date Filter
  ├── Category Summary
  └── Export CSV
```

## Difficulty Levels

The application supports four difficulty levels:

```text
Beginner
Intermediate
Advanced
Expert
```

## API Endpoints

### Authentication

```text
POST /api/auth/login
```

### Scenarios

```text
GET    /api/scenarios
POST   /api/scenarios
PUT    /api/scenarios/{scenario_id}
DELETE /api/scenarios/{scenario_id}
```

### Notes

```text
GET  /api/notes/{scenario_id}
POST /api/notes
```

### Statistics

```text
GET /api/stats/summary
GET /api/stats/by-category
GET /api/stats/by-difficulty
GET /api/stats/report
GET /api/stats/report/csv
```

Report supports optional date filtering:

```text
GET /api/stats/report?date_from=2026-08-01&date_to=2026-08-31
```

## Testing

### Backend Health Check

```text
http://127.0.0.1:8000/health/database
```

Expected:

```json
{
  "status": "ok",
  "database": "PostgreSQL"
}
```

### Frontend Lint

```powershell
npm run lint
```

The project should complete without errors or warnings.

## Database

The PostgreSQL database itself is not included in the repository.

To reproduce the application on another computer:

1. Install PostgreSQL.
2. Create `cybersecurity_db`.
3. Configure `backend/.env`.
4. Install backend dependencies.
5. Start the backend to create the tables.
6. Run `python create_admin.py`.
7. Run `python seed_data.py`.
8. Install frontend dependencies with `npm install`.
9. Run the frontend with `npm run dev`.

## Security Notes

- `.env` is excluded from Git.
- Database credentials and secret keys should not be committed.
- The default administrator credentials are provided for development and testing only.
- Production deployments should use a strong password and secret key.

## License

Developed as part of a cybersecurity developer technical test.
