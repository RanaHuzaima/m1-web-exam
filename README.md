# Bikez.ai — M1 Web Development Exam

Bike shop management app for **Bikez.ai**: customers, bicycle catalog, and purchases.

Built on the provided exam starter. It includes:

- **Backend** — NestJS REST API + TypeORM + SQLite  
- **Frontend** — React + TypeScript + Vite + Ant Design + TanStack Router  

**Live demo:** https://m1-web-exam.ranahuzaima.com

---

## What was implemented

### Exercise 1 — Customer pagination

- `GET /customers?page=&limit=` returns `{ totalCount, customers }`
- Defaults: `page=1`, `limit=10` (max limit: 50)
- Invalid params → `400`
- Customers page supports page navigation
- Newest customers appear first

### Exercise 2 — Bicycle catalog

- Full bikes CRUD API with the same pagination rules (`{ totalCount, bikes }`)
- Missing bike → `404`
- Delete bike that has sales → `409`
- Frontend: list, details, create, update, delete (+ confirmation)
- Accessible from the main navigation
- Newest bikes appear first

### Extra (existing API + UI)

- Record a purchase from a customer page (`Add purchase`)
- Dark mode UI

---

## Prerequisites

- Git
- Node.js **24.15+** (24.x) with npm

---

## How to run

Use **two terminals**.

### 1. Backend

```bash
cd backend
npm install
npm run seed
npm run start:dev
```

API: [http://localhost:3000](http://localhost:3000)

`npm run seed` builds the app, creates `backend/db.sqlite`, and inserts sample customers, bikes, and sales.  
Running seed again adds another batch of data.

Later starts:

```bash
cd backend
npm run start:dev
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

UI: [http://localhost:5173](http://localhost:5173)  
(If that port is taken, use the URL shown by Vite.)

The backend must stay running on port `3000`.

Stop either app with `Ctrl+C`.

---

## Main API routes

### Customers

| Method | Route | Description |
|--------|--------|-------------|
| GET | `/customers?page=&limit=` | Paginated customer list |
| POST | `/customers` | Create customer |
| GET | `/customers/:id` | Customer details |
| PATCH | `/customers/:id` | Update customer |
| DELETE | `/customers/:id` | Delete customer (+ their sales) |
| GET | `/customers/:id/bikes` | Customer purchases |
| POST | `/customers/:id/bikes` | Record a sale (`bikeId`, `quantity`) |

### Bikes

| Method | Route | Description |
|--------|--------|-------------|
| GET | `/bikes?page=&limit=` | Paginated bike catalog |
| POST | `/bikes` | Create bike |
| GET | `/bikes/:id` | Bike details |
| PATCH | `/bikes/:id` | Update bike |
| DELETE | `/bikes/:id` | Delete bike (409 if linked to a sale) |

---

## Frontend pages

| Path | Features |
|------|----------|
| `/` | Home |
| `/customers` | List, pagination, create, delete |
| `/customers/:customerId` | Edit info, purchases, add purchase |
| `/bikes` | Catalog list, pagination, create, delete |
| `/bikes/:bikeId` | Bike details and edit |

---

## Project structure

```
m1-web-exam/
├── backend/          # NestJS API
│   └── src/
│       ├── customers/
│       ├── bikes/
│       ├── common/   # shared pagination DTO
│       └── database/
└── frontend/         # React app
    └── src/
        ├── customers/
        ├── bikes/
        ├── home/
        ├── routes/
        └── shared/
```

---

## Run with Docker

Needs Docker Desktop (or Docker Engine + Compose).

```bash
docker compose up --build
```

Then open:

- Frontend: [http://localhost:8080](http://localhost:8080)
- Backend API: [http://localhost:3000](http://localhost:3000)

SQLite data is stored in a Docker volume (`bikez-data`).  
The first start seeds the database automatically if it does not exist yet.

Stop:

```bash
docker compose down
```