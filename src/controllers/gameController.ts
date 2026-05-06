import asyncHandler from 'express-async-handler';
import { Request, Response, RequestHandler } from 'express';

// @desc    Start a new game
// @route   POST /api/scores/start
// @access  Public
export const startGame: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({ message: 'Game started' });
});