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

router.patch(
  '/:id/',
  (req: Request, res: Response) => { matchesController.updateMatchGoals(req, res); },
);

router.patch(
  '/:id/finish',
  (req: Request, res: Response) => { matchesController.updateMatchProgress(req, res); },
);

export default router;
