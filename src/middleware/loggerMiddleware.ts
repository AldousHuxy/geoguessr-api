import { log } from 'console';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import colors from 'colors';
import moment from 'moment';

const methodColors = {
	GET: 'green',
	POST: 'blue',
	PUT: 'yellow',
	PATCH: 'cyan',
	DELETE: 'red'
} as const

export const logger: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
	const color = methodColors[req.method as keyof typeof methodColors] || 'white'
	log(colors[color](`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl} ${moment().format()}`))
	next()
}
