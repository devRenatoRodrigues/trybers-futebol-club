import { Request, Router, Response } from 'express';
import LeaderboardController from '../controllers/Leaderboard.controller';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get('/', (req:Request, res:Response) => leaderboardController.getClassification(req, res));

router.get('/home', (req:Request, res:Response) => leaderboardController.getHomeTeams(req, res));

router.get('/away', (req:Request, res:Response) => leaderboardController.getAwayTeams(req, res));

export default router;
