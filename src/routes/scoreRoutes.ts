import { Router } from "express";
import { getAllScores, getTopScores, saveScore } from '../controllers/scoreController'

export const router: Router = Router();

router.get('/', getAllScores)
router.get('/top', getTopScores)
router.post('/', saveScore)