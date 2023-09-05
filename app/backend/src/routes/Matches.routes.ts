import { Request, Router, Response } from 'express';
import validateNewTeamCreate from '../middlewares/validateNewTeamCreate.middleware';
import MatchesController from '../controllers/Matches.controller';
import validateToken from '../middlewares/validateToken.middleware';

const matchesController = new MatchesController();

const router = Router();
router.get('/', (req: Request, res: Response) => {
  matchesController.getAllMatches(req, res);
});

router.patch(
  '/:id/',
  validateToken,
  (req: Request, res: Response) => { matchesController.updateMatchGoals(req, res); },
);

router.patch(
  '/:id/finish',
  validateToken,
  (req: Request, res: Response) => { matchesController.updateMatchProgress(req, res); },
);

router.post(
  '/',
  validateToken,
  validateNewTeamCreate,
  (req: Request, res: Response) => { matchesController.createNewMatch(req, res); },
);

export default router;
