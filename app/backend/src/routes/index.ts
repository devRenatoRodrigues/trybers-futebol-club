import { Router } from 'express';
import teamsRouter from './teams.routes';
import userRouter from './user.routes';
import matchesRouter from './Matches.routes';
import leaderboardRouter from './Leaderboard.routes';

const router = Router();

router.use('/teams', teamsRouter);

router.use('/login', userRouter);

router.use('/matches', matchesRouter);

router.use('/leaderboard', leaderboardRouter);

export default router;
