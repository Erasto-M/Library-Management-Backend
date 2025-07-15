import { Request, Response, NextFunction } from 'express';
import { ErrorRequestHandler } from 'express';
import multer from 'multer';
import { StatusCodes } from 'http-status-codes';

const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
    if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "File too large. Please upload files less than or equal to 5MB.",
        });
        return;
    }

    if (err instanceof multer.MulterError) {
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: `Multer error: ${err.message}`,
        });
        return;
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message || 'Internal server error',
    });
    return;

};

export default errorHandler;
