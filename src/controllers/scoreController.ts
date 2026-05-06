import asyncHandler from 'express-async-handler';
import { Request, Response, RequestHandler } from 'express';
import { ScoreModel } from '../models/scoreModel';

const MAX_ATTEMPTS = 3;

// @desc    Get all scores
// @route   GET /api/scores
// @access  Public
export const getAllScores: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const scores = await ScoreModel.find({});
    res.status(200).json(scores);
});

// @desc    Get top ten scores
// @route   GET /api/scores/top
// @access  Public
export const getTopScores: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const topScores = await ScoreModel.find({}).sort({ score: -1 }).limit(10);
    res.status(200).json(topScores);
});

// @desc    Save or update a score
// @route   POST /api/scores
// @access  Public
export const saveScore: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const { email, score } = req.body;

    if (!email || score === undefined) {
        res.status(400).json({ message: 'email and score are required.' });
        return;
    }

    const existing = await ScoreModel.findOne({ email });

    if (!existing) {
        const newScore = await ScoreModel.create({ email, score, attempts: 1 });
        res.status(201).json(newScore);
        return;
    }

    if (existing.attempts >= MAX_ATTEMPTS) {
        res.status(403).json({
            message: `You've used all ${MAX_ATTEMPTS} attempts. No more submissions are allowed for this email.`
        });
        return;
    }

    existing.attempts += 1;
    if (score > existing.score) {
        existing.score = score;
    }
    await existing.save();

    res.status(200).json(existing);
});