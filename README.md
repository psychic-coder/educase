# School Management API

A simple, scalable, and maintainable REST API for school management built with Node.js, Express.js, and MySQL.

## Live API

> https://educase-yn9b.onrender.com

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL (hosted on Aiven)
- **Packages:** `mysql2`, `dotenv`

## Project Structure

```
educase/
├── src/
│   ├── config/
│   │   └── db.js           # MySQL connection pool
│   ├── controllers/
│   │   └── schoolController.js  # Route logic + Haversine formula
│   └── routes/
│       └── schoolRoutes.js      # API routes
├── server.js               # Entry point
├── .env.example            # Environment variable template
└── package.json
```

## Local Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure environment variables:**

   ```bash
   cp .env.example .env
   ```

   Fill in your MySQL credentials in `.env`.

3. **Start in development mode:**

   ```bash
   npm run dev
   ```

4. **Start in production mode:**
   ```bash
   npm start
   ```

## Environment Variables

| Variable      | Description     | Example                    |
| ------------- | --------------- | -------------------------- |
| `DB_HOST`     | MySQL host      | `mysql-xxx.aivencloud.com` |
| `DB_USER`     | MySQL username  | `avnadmin`                 |
| `DB_PASSWORD` | MySQL password  | `your_password`            |
| `DB_NAME`     | Database name   | `defaultdb`                |
| `DB_PORT`     | MySQL port      | `13833`                    |
| `PORT`        | API server port | `3000`                     |

## API Endpoints

### Health Check

```
GET /health
```

Response:

```json
{ "status": "ok", "timestamp": "2026-05-09T00:00:00.000Z" }
```

### Add a School

```
POST /addSchool
Content-Type: application/json
```

Request Body:

```json
{
  "name": "Delhi Public School",
  "address": "Mathura Road, New Delhi",
  "latitude": 28.5562,
  "longitude": 77.241
}
```

Response (`201 Created`):

```json
{ "message": "School added successfully", "schoolId": 1 }
```

### List Schools by Proximity

```
GET /listSchools?latitude=28.7041&longitude=77.1025
```

Response (`200 OK`):

```json
[
  {
    "id": 1,
    "name": "Delhi Public School",
    "address": "Mathura Road, New Delhi",
    "latitude": 28.5562,
    "longitude": 77.241,
    "distance": 12.34
  }
]
```

Schools are sorted nearest-first based on the Haversine formula.

## Deploying to Render

1. Push your code to GitHub.
2. Go to [Render](https://render.com) → **New Web Service**.
3. Connect your GitHub repo.
4. Set:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add all environment variables from `.env.example` in the **Environment** tab.
6. Deploy!
