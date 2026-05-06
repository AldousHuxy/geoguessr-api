import express, { Application, Request, Response, json, urlencoded } from 'express';
import { PORT, CLIENT_URL } from './env';
import cors from 'cors';
import { logger } from './middleware/loggerMiddleware';
import { errorHandler } from './middleware/errorMiddleware';

const app: Application = express()

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cors({ origin: CLIENT_URL }))
app.use(logger)

app.get('/', (req: Request, res: Response) => { res.json(`Success: ${Date().toString()}`) })
app.get('/api', (req: Request, res: Response) => { res.json('Connected to the District Geoguessr API!') })

app.use(errorHandler)

app.listen(PORT, () => console.log(`listening for request at: http://localhost:${PORT}`))
