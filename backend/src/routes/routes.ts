import Router from 'express';
import { AuthenticationController } from '../controllers/authentication.controller';

const router = Router();
router.post('/register',AuthenticationController.register);
router.post('/login',AuthenticationController.login);
router.post('/logout',AuthenticationController.logout);

export{router}