import {Router } from 'express';
import userController from '../controllers/user.controller';
import {authenticateToken, authorize} from '../middlewares/auth.middleware';

const router =Router();

router
     .post("/register", userController.createUser)
     .post('/login',userController.loginUser)
     .get('/getAll', authenticateToken,authorize(['admin']), userController.getAllUsers);
     
     export default router;