# School Management API

A simple, scalable, and maintainable Node.js + Express.js API backend for school management using MySQL.

## Features

- **Add School:** `POST /addSchool` - Add a new school with name, address, latitude, and longitude.
- **List Schools:** `GET /listSchools` - Fetch all schools sorted by geographic proximity to user-provided coordinates using the Haversine formula.

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server

## Setup Instructions

1. **Clone or Download the Project:**
   Ensure you are in the project root folder.

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Database Setup:**
   Run the provided `schema.sql` script in your MySQL instance to create the database and table:
   ```bash
   mysql -u root -p < schema.sql
   ```

4. **Environment Configuration:**
   Copy the `.env.example` file to a new file named `.env`:
   ```bash
   cp .env.example .env
   ```
   Open the `.env` file and update it with your actual MySQL credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=school_management
   PORT=3000
   ```

5. **Start the Server:**
   ```bash
   node server.js
   ```

## Hosting Instructions

To deploy this API to a hosting provider (like Render, Heroku, or DigitalOcean):
1. Provision a MySQL database instance.
2. Configure the environment variables (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `PORT`) in the hosting provider's dashboard.
3. Define your start command as `node server.js`.
4. Deploy your code.

## Postman Collection

A `postman_collection.json` file is included. You can import this into Postman to easily test the `POST /addSchool` and `GET /listSchools` endpoints.
