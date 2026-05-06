import { NODE_ENV } from '../env';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

export const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
	res.json({
		message: err.message,
		stack: NODE_ENV === 'production' ? null : err.stack
	})
}
