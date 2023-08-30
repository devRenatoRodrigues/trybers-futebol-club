import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/Matches.controller';

const matchesController = new MatchesController();

const router = Router();
router.get('/', (req: Request, res: Response) => {
  if (req.query.inProgress) {
    matchesController.findByProgress(req, res);
  } else {
    matchesController.getAllTeams(req, res);
  }
});

export default router;
