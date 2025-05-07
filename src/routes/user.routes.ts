import {Router } from 'express';
import userController from '../controllers/user.controller';

const router =Router();

router
     .post("/register", userController.createUser)
     .post('/login',userController.loginUser);
     
     export default router;