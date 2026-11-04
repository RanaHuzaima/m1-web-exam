# Bike shop — Exam codebase

This project provides a starting codebase for a web development exam. It includes
a bike shop management application with customers, a bike catalog, and sales.

It consists of two parts:

- `backend`: a REST API built with NestJS and TypeORM, using a local SQLite database.
- `frontend`: a user interface built with React, TypeScript, and Vite.

## Prerequisites

- Git.
- Node.js 24.15 or a newer version in the 24.x release line, with npm.

## Clone the project

In a terminal:

```bash
git clone https://github.com/Iberos/m1-web-exam.git
cd m1-web-exam
```

Then run the backend and frontend in **two separate terminals**.

## Backend

From the project root, install the dependencies, seed the database,
and start the API:

```bash
cd backend
npm install
npm run seed
npm run start:dev
```

The API is available at [http://localhost:3000](http://localhost:3000).
The customer list is available at [http://localhost:3000/customers](http://localhost:3000/customers).

The `npm run seed` command builds the backend, creates the `backend/db.sqlite`
database, and adds sample customers, bikes, and sales. No external database
server is required. Each additional run adds another batch of data.

For subsequent starts, simply run `npm run start:dev` from the `backend`
directory. Keep this terminal open while using the application.

## Frontend

In a second terminal, from the project root:

```bash
cd frontend
npm install
npm run dev
```

The interface is available at [http://localhost:5173](http://localhost:5173)
by default. If this port is already in use, open the URL shown by Vite in the terminal.
The backend must remain running on port `3000` so the interface can access the data.

For subsequent starts, simply run `npm run dev` from the `frontend` directory.

To stop the applications, press `Ctrl+C` in each terminal.
