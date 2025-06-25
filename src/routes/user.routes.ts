import {Router } from 'express';
import userController from '../controllers/user.controller';
import {authenticateToken, authorize} from '../middlewares/auth.middleware';


const router =Router();


router
     .post("/register", userController.createUser)
     .post('/login',userController.loginUser)
     .get('/getAll', authenticateToken,authorize(['admin']), userController.getAllUsers)
     .post('/refreshToken',userController.createNewAccessToken)
     .post('/sendOtp', userController.sendOtp)
     .post('/resetPassword', userController.resetPasswordAndVerifyOtp)
     .get("/get/:userId", authenticateToken , userController.getUserById);
     
     export default router;