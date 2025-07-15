import { Request, Response } from 'express';
import uploadsService, { UploadFile } from '../services/uploads.service';
import { StatusCodes } from 'http-status-codes';


/* Upload single file  */
const uploadSingleFile = async (req: Request, res: Response) => {
    try {
        const file = req.file as unknown as UploadFile;
        const uploadedResult = await uploadsService.uploadSingleFile({ file: file });
        if (uploadedResult) {
            res.status(StatusCodes.OK).json({
                success: true,
                message: "File uploaded successfully",
                data: uploadedResult,
            });
        }

    } catch (err) {
        if (err instanceof Error) {
            res.json({
                success: false,
                message: err.message,
            })
        }
    }
}

/* Upload multiple files */
const uploadMultipleFiles = async (req: Request, res: Response) => {
    try {
        const files = req.files as unknown as UploadFile[];
        const bulkResult = await uploadsService.uploadMultipleFiles({ files: files });
        if (bulkResult) {
            res.status(StatusCodes.OK).json({
                success: true,
                message: "Files Uploaded successfully",
                data: bulkResult,
            })
        }
    } catch (e) {
        if (e instanceof Error) {
            res.json({
                success: false,
                message: e.message,
            })
        }
    }
}

export default {
    uploadSingleFile,
    uploadMultipleFiles,
}