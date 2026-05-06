import express, { Application, Request, Response, json, urlencoded } from 'express';
import { Connection, connect, connection } from 'mongoose';
import { PORT, CLIENT_URL, MONGO_URI } from './env';
import cors from 'cors';
import { logger } from './middleware/loggerMiddleware';
import { errorHandler } from './middleware/errorMiddleware';
import { router as scoreRoutes } from './routes/scoreRoutes';
import { router as gameRoutes } from './routes/gameRoutes';

const app: Application = express()

connect(MONGO_URI)
const db: Connection = connection
db.on('error', err => console.error(`MongoDB connection error: ${err}`))
db.once('open', () => console.log(`Connected to database: ${db.name}`))

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cors({ origin: '*' }))
app.use(logger)

app.get('/', (req: Request, res: Response) => { res.json(`Success: ${Date().toString()}`) })
app.get('/api', (req: Request, res: Response) => { res.json('Connected to the District Geoguessr API!') })

app.use('/api/game', gameRoutes)
app.use('/api/scores', scoreRoutes)

app.use(errorHandler)

app.listen(PORT, () => console.log(`listening for request at: http://localhost:${PORT}`))
