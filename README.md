# Geoguessr API

REST API backend for the District Geoguessr app. Built with Node.js, Express, TypeScript, and MongoDB.

## Base URL

```
https://geoguessr-api.onrender.com
```

## Endpoints

### Health Check

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api` | Confirms the API is running |

### Scores

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/scores` | Returns all scores |
| `GET` | `/api/scores/top` | Returns the top 10 scores, sorted highest first |
| `POST` | `/api/scores` | Submits a score for a given email |

#### POST `/api/scores`

**Request Body**

```json
{
  "email": "user@example.com",
  "score": 4200
}
```

**Rules**
- Each email is limited to **3 attempts**
- The stored score is only updated if the new score is **higher**
- Returns `403` if the attempt limit has been reached

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **Language:** TypeScript
- **Database:** MongoDB (Mongoose)
- **Hosting:** Render

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Port the server listens on |
| `MONGO_URI` | MongoDB connection string |
| `CLIENT_URL` | Allowed CORS origin (e.g. `https://aldoushuxy.github.io`) |
| `NODE_ENV` | Environment (`development` or `production`) |

## Scripts

```bash
npm run dev     # Start dev server with nodemon
npm run build   # Compile TypeScript
npm start       # Run compiled output
```
