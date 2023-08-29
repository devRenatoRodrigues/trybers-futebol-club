import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/Matches.controller';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req:Request, res:Response) => matchesController.getAllTeams(req, res));

export default router;
