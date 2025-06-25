import rateLimit from 'express-rate-limit';
import {Request , Response , NextFunction} from 'express';
import { STATUS_CODES } from 'http';

export const  basicRateLimiter = rateLimit({
    windowMs: 15* 60*1000, //15 minutees 
    max: 5, // limit each IP to 100 requetsss per windows 
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req: Request , res: Response , next: NextFunction)=>{
        res.status(429).json({
            success: false,
            message: "Too many requests , Please try again later ",
        });
    }
});