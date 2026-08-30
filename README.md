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
