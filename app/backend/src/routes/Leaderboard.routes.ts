import { Request, Router, Response } from 'express';
import validateToken from '../middlewares/validateToken.middleware';
import LeaderboardController from '../controllers/Leaderboard.controller';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get(
  '/',
  validateToken,
  (req:Request, res:Response) => leaderboardController.getClassification(req, res),
);

router.get(
  '/home',
  validateToken,
  (req:Request, res:Response) => leaderboardController.getHomeTeams(req, res),
);

router.get(
  '/away',
  validateToken,
  (req:Request, res:Response) => leaderboardController.getAwayTeams(req, res),
);

export default router;
