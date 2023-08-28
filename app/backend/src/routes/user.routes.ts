import { Request, Router, Response } from 'express';
import validateToken from '../middlewares/validateToken.middleware';
import UserController from '../controllers/Users.controller';
import validateLoginFields from '../middlewares/validateLoginFields.middleware';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  validateLoginFields,
  (req:Request, res:Response) => userController.login(req, res),
);

router.get(
  '/role',
  validateToken,
  (req:Request, res:Response) => userController.getRole(req, res),
);

export default router;
