import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { JwtPayload } from "jsonwebtoken";


export interface CustomRequest extends Request {
    user?: JwtPayload,
}

export interface UserPayload {
    userId: string,
    email: string,
    role: string,
}

export function authenticateToken(req: CustomRequest, res: Response, next: NextFunction): void {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            res.json({ message: "Unauthorized : No token provided  " });
        }
        jwt.verify(token as string, process.env.JWT_SECRET as string, (err, user) => {
            if (err) {
                res.json({
                    message: "Forbidden : Invalid token"
                });
            }
            req.user = user as JwtPayload;
            next();
        });

    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error("An error occurred while validating token");
        }

    }
}

export function authorize(roles: string[]) {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            res.json({
                message: "No token provided",
            });
            return;
        }
        try {
            const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string) as UserPayload;
            console.log(decoded);
            if (roles.includes(decoded.role)) {
                req.user = decoded;
               return  next();
            } else {
                res.json({
                    message: "Unauthorized : Insufficient role",
                })
            }
        } catch (err) {
            if (err instanceof Error) {
                res.json({
                    message: "Invalid token provided",
                });
                return;
            }
        }

    }
}
