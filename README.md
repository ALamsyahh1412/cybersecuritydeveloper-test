# Cybersecurity Scenario Manager

A web-based application for managing cybersecurity scenarios.

The application provides authentication, scenario management, filtering, pagination, dashboard statistics, difficulty visualization, reporting, CSV export, and developer notes.

## Features

- JWT-based authentication
- Login and protected routes
- Create cybersecurity scenarios
- View cybersecurity scenarios
- Edit cybersecurity scenarios
- Delete cybersecurity scenarios
- Search scenarios
- Filter scenarios by difficulty
- Filter scenarios by status
- Filter scenarios by category
- Filter scenarios by arranged date
- Pagination
- Dashboard summary
- Difficulty statistics
- Category statistics
- Difficulty pie chart
- Scenario report
- Export report to CSV
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
- Passlib
- bcrypt

### Frontend

- React
- Vite
- React Router
- Axios
- Recharts

## Project Structure

```text
cybersecurity-dev-test/
│
├── backend/
│   ├── app/
│   │   ├── auth/
│   │   ├── models/
│   │   ├── routers/
│   │   ├── schemas/
│   │   ├── database.py
│   │   └── main.py
│   │
│   ├── create_admin.py
│   ├── seed_data.py
│   ├── requirements.txt
│   ├── .env.example
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md

Requirements

Make sure the following software is installed:

Python 3.13 or newer
Node.js
npm
PostgreSQL
Git

Check the installed versions:
python --version
node --version
npm --version
psql --version
git --version

Installation
1. Clone the Repository
git clone https://github.com/ALamsyahh1412/cybersecuritydeveloper-test.git

Enter the project directory:
cd cybersecurity-dev-test

2. Setup PostgreSQL
Create an empty PostgreSQL database named:
cybersecurity_db
For example:
CREATE DATABASE cybersecurity_db;

The database does not need to contain tables manually.

The application uses SQLAlchemy models and creates the required tables when the backend starts.

The main database tables are:

users
scenarios
notes

3. Setup Backend
Enter the backend directory:
cd backend

Create a Python virtual environment:
python -m venv venv

Activate the virtual environment on Windows PowerShell:
.\venv\Scripts\Activate.ps1

Install the required dependencies:
python -m pip install -r requirements.txt


4. Configure Environment Variables
Create the .env file from .env.example:
Copy-Item .env.example .env
Open the .env file and configure the PostgreSQL connection:

DATABASE_URL=postgresql+psycopg2://postgres:YOUR_PASSWORD@localhost:5432/cybersecurity_db

SECRET_KEY=your-secret-key

ACCESS_TOKEN_EXPIRE_MINUTES=60

Replace YOUR_PASSWORD with the password of the PostgreSQL user on the local machine.

Example:

DATABASE_URL=postgresql+psycopg2://postgres:postgres@localhost:5432/cybersecurity_db

SECRET_KEY=cybersecurity-dev-test-super-secret-key

ACCESS_TOKEN_EXPIRE_MINUTES=60

Do not commit the .env file to the repository because it may contain database credentials and secret keys.

5. Create Database Tables

Start the FastAPI backend:
uvicorn app.main:app --reload

The application automatically creates the required database tables using:
Base.metadata.create_all(bind=engine)

After the tables have been created, stop the server with:
CTRL + C

6. Create Admin User
Make sure the virtual environment is active and run:

python create_admin.py

The script creates the default administrator account.

Default login credentials:

Email: admin@example.com
Password: Admin123!

If the administrator already exists, the script will display:
Admin user already exists.

7. Seed Initial Data

Run the seed script:
python seed_data.py

The script adds the initial cybersecurity scenario data.

Example output:
Seed berhasil. 5 scenario baru ditambahkan.

Running the script again will not create duplicate seed data if the data already exists.

8. Run Backend

From the backend directory:
.\venv\Scripts\Activate.ps1

Then run:
uvicorn app.main:app --reload

The backend will be available at:
http://127.0.0.1:8000

FastAPI documentation is available at:
http://127.0.0.1:8000/docs

9. Setup Frontend

Open a new terminal and enter the frontend directory:
cd cybersecurity-dev-test/frontend

Install frontend dependencies:
npm install

The project uses Recharts for the dashboard visualization. If it is not already installed, run:

npm install recharts

10. Run Frontend

From the frontend directory:
npm run dev

The frontend will normally be available at:
http://localhost:5173

Open the URL in a browser.

Login
Use the administrator account created by create_admin.py

Email: admin@example.com
Password: Admin123!

After successful authentication, the user will be redirected to the dashboard.

Login
  │
  ▼
Dashboard
  │
  ├── Summary Statistics
  │
  ├── Difficulty Pie Chart
  │
  └── Scenario Management
          │
          ├── Search
          ├── Filter
          ├── Pagination
          ├── Create
          ├── Edit
          └── Delete


API Endpoints
Authentication

POST /api/auth/login
Scenarios

Get scenarios:

GET /api/scenarios

Example:

GET /api/scenarios?page=1&limit=10

Create scenario:

POST /api/scenarios

Update scenario:

PUT /api/scenarios/{scenario_id}

Delete scenario:

DELETE /api/scenarios/{scenario_id}
Notes

Get notes:

GET /api/notes/{scenario_id}

Create note:

POST /api/notes
Statistics

Dashboard summary:

GET /api/stats/summary

Statistics by category:

GET /api/stats/by-category

Statistics by difficulty:

GET /api/stats/by-difficulty

Scenario report:

GET /api/stats/report

Export report as CSV:

GET /api/stats/report/csv

Database Structure

The application uses three main tables:

users
  │
  ├── scenarios
  │      │
  │      └── notes
  │
  └── notes

A user can create multiple scenarios.

A scenario can have multiple developer notes.

When a scenario is deleted, its related notes are automatically deleted through the configured cascade relationship.

Environment Variables

The backend requires the following environment variables:

Variable	Description
DATABASE_URL	PostgreSQL database connection
SECRET_KEY	Secret key used for JWT authentication
ACCESS_TOKEN_EXPIRE_MINUTES	JWT expiration time

Example:

DATABASE_URL=postgresql+psycopg2://postgres:YOUR_PASSWORD@localhost:5432/cybersecurity_db
SECRET_KEY=your-secret-key
ACCESS_TOKEN_EXPIRE_MINUTES=60

Running the Complete Application

The application requires two terminals.

Terminal 1 - Backend
cd cybersecurity-dev-test\backend

.\venv\Scripts\Activate.ps1

uvicorn app.main:app --reload

Backend:

http://127.0.0.1:8000
Terminal 2 - Frontend
cd cybersecurity-dev-test\frontend

npm install

npm run dev

Frontend:

http://localhost:5173
Testing
Backend Health Check

Open:

http://127.0.0.1:8000/health/database

Expected response:

{
  "status": "ok",
  "database": "PostgreSQL"
}
Frontend Lint

Run:

npm run lint

The project should complete linting without errors.

Troubleshooting
PostgreSQL Connection Error

Check the following:

PostgreSQL is running.
The cybersecurity_db database exists.
PostgreSQL username is correct.
PostgreSQL password is correct.
The DATABASE_URL value in .env is correct.
Backend Dependency Error

Make sure the virtual environment is active:

.\venv\Scripts\Activate.ps1

Then install the dependencies:

python -m pip install -r requirements.txt
Frontend Dependency Error

From the frontend directory:

npm install

Then run:

npm run dev
Important Notes for Reviewers

The PostgreSQL database itself is not included in this repository.

The reviewer does not need a copy of the developer's local PostgreSQL database.

To reproduce the application on another computer:

Install PostgreSQL.
Create an empty database named cybersecurity_db.
Configure backend/.env.
Install backend dependencies using requirements.txt.
Start the backend once to create the database tables.
Run python create_admin.py to create the administrator account.
Run python seed_data.py to add initial scenario data.
Install frontend dependencies using npm install.
Run the frontend using npm run dev.
Login using the administrator credentials.
Default Administrator Account
Email: admin@example.com
Password: Admin123!

This account is created by running:

python create_admin.py
Security Notes

For development and testing purposes, the project provides a default administrator account.

For production deployment, the default password and secret key should be changed.

The .env file should never be committed to the repository.

The repository only contains .env.example as a template for environment configuration.

License

This project was developed as part of a cybersecurity developer technical test.


**Jadi yang di atas tinggal kamu copy semuanya ke satu file `README.md` di folder paling luar:**

```text
cybersecurity-dev-test/
├── backend/
├── frontend/
├── .gitignore
└── README.md   ← taruh di sini