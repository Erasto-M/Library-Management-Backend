import { Request, Response } from 'express';
import  { ResetUser, User } from '../models/user.model';
import userService from '../services/user.service';



const createUser = async (req: Request, res: Response) => {
    try {
        const reqBody = req.body as User;
        const user = await userService.createUser({ user: reqBody });

        res.json({
            success: true,
            message: "User created successfully",
            data: user
        });

        return;

    } catch (err) {
        if (err instanceof Error) {
            res.json({
                success: false,
                message: err.message,
            });
        }
    }
}

const loginUser = async (req: Request, res: Response) => {
    try {
        const reqBody = req.body as User;
        const user = await userService.loginUser({ user: reqBody });

        res.json({
            success: true,
            message: "User loggedIn successfully",
            data: user
        });

        return;

    } catch (err) {
        if (err instanceof Error) {
            res.json({
                success: false,
                message: err.message,
            });
        }
    }
}

const createNewAccessToken = async (req: Request, res: Response) => {
    try {
        const refreshToken = Object.values(req.body).find(value => typeof value === 'string');
        const newToken = await userService.createNewAccessToken({ refreshToken: refreshToken as string });
        res.json({
            sucess: true,
            message: "access token generated successfully",
            accessToken: newToken,
        })
    } catch (err) {
        if (err instanceof Error) {
            res.json({
                "success": false,
                "message": err.message,
            });
        }
    }
}

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const allUsers = await userService.getAllUsers();
        res.json({
            success: true,
            message: "Users Fetched Successfully",
            data: allUsers,
        })
    } catch (err) {
        if (err instanceof Error) {
            res.json({
                success: false,
                message: err.message,
            });
        }
    }
}

const sendOtp =async(req: Request,  res: Response)=>{
    try{
        const user = req.body as User;
        const result =await userService.sendOtp({user: user}); 
       if(result == true){
        res.json({
            success: true,
            message: "OTP send successfully, Check your email ",
        })
       }

    }catch(err){
        if (err instanceof Error) {
            res.json({
                success: false,
                message: err.message,
            });
        }
    }
}
const resetPasswordAndVerifyOtp =async(req: Request, res: Response)=>{
 try{
 const body = req.body as ResetUser;
 const result = await userService.resetPasswordAndVerifyOtp({user: body});
 if(result === true){
    res.json({
        success: true,
        message:"Password reset successfully", 
    })
 }
 }catch(err){
    if (err instanceof Error) {
        res.json({
            success: false,
            message: err.message,
        });
    }
 }
}

const getUserById =async(req: Request, res: Response)=>{
    try{
        const  userId = req.params.userId as string;
        const userInfo = await userService.getUserById({id: userId});
        res.json({
            success: true,
            message: "User fetched successfully",
            data: userInfo,
        })
    }catch(err){
        if(err instanceof Error){
            res.json({
                success: false,
                message: err.message,
            });
        }
    }
}

export default {
    createUser,
    loginUser,
    getAllUsers,
    createNewAccessToken,
    sendOtp,
    resetPasswordAndVerifyOtp,
    getUserById,
}