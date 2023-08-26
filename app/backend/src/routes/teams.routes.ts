import { Request, Router, Response } from 'express';
import TeamsController from '../controllers/Teams.controller';

const teamsController = new TeamsController();

const router = Router();

router.get('/', (req:Request, res:Response) => teamsController.getAllTeams(req, res));

router.get('/:id', (req:Request, res:Response) => teamsController.getUserById(req, res));

export default router;
