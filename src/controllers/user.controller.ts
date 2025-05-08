import {Request ,Response} from 'express';
import {User} from '../models/user.model';
import userService from '../services/user.service'; 


const createUser = async(req: Request ,res: Response)=>{
try{
    const reqBody = req.body as User;
    const user = await userService.createUser({user: reqBody});

    res.json({
        success: true,
        message: "User created successfully",
        data: user
    });

    return;

} catch(err){
    if(err instanceof Error){
        res.json({
            success: false,
            message: err.message,
        });
    }
}
}

const loginUser = async(req: Request ,res: Response)=>{
    try{
        const reqBody = req.body as User;
        const user = await userService.loginUser({user: reqBody});
    
        res.json({
            success: true,
            message: "User loggedIn successfully",
            data: user
        });
    
        return;
    
    } catch(err){
        if(err instanceof Error){
            res.json({
                success: false,
                message: err.message,
            });
        }
    }
    }

    const  getAllUsers = async (req: Request, res: Response)=>{
        try{
            const allUsers = await userService.getAllUsers();
            res.json({
                success: true,
                message: "Users Fetched Successfully",
                data: allUsers,
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
}