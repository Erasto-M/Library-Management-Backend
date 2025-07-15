import rateLimit from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';
import { EventEmitter } from 'events';
EventEmitter.defaultMaxListeners = 20;

//basic rate limiter
export const basicRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes 
    max: 100, // limit each IP to 100 requetsss per windows 
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req: Request, res: Response, next: NextFunction) => {
        res.status(StatusCodes.TOO_MANY_REQUESTS).json({
            success: false,
            code: StatusCodes.TOO_MANY_REQUESTS,
            message: "Too many requests , Please try again later ",
        },);
    }
});


//rate limiter with redis
const redisClient = new Redis({
    host: '127.0.0.1',
    port: 6379,
});


export const redisRateLimiter = rateLimit({
    store: new RedisStore({
        sendCommand: (...args: [string, ...string[]]) =>
            redisClient.call(...args) as unknown as Promise<any>,
    }),
    windowMs: 15 * 60 * 1000,  // 15 minutes 
    max: 100,    // limit each IP to 100 requetsss per windows 
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req: Request, res: Response, next: NextFunction) => {
        res.status(StatusCodes.TOO_MANY_REQUESTS).json({
            success: false,
            code: StatusCodes.TOO_MANY_REQUESTS,
            message: "Too many requests , Please try again later ",
        },
    );
    }
});