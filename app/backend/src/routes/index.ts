import { Router } from 'express';
import validateLoginFields from '../middlewares/validateLoginFields.middleware';
import teamsRouter from './teams.routes';
import userRouter from './user.routes';

const router = Router();

router.use('/teams', teamsRouter);

router.use('/login', validateLoginFields, userRouter);

export default router;
