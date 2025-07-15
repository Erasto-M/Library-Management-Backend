import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3 } from '../config/s3';
import upload from "../config/upload";
import { v4 as uuidv4 } from 'uuid';

export interface UploadFile {
    buffer: Buffer;
    mimetype: string;
    originalname: string;
}

/* Upload single file */
const uploadSingleFile = async ({ file }: { file: UploadFile }) => {
    try {
        const key = `uploads/${uuidv4()}-${file.originalname}`;

        /*. Upload file to s3 */
        const command = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        });
        // send to s3
        await s3.send(command);

        // generate file. url 
        const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
        const uploadedAt = new Date().toISOString();
        return {
            fileName: file.originalname,
            link: fileUrl,
            time: uploadedAt,
        }
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error("Something went wrong while uploading file");
        }
    }
}
/* Upload many files */
const uploadMultipleFiles = async ({ files }: { files: UploadFile[] }) => {
    try {
        const uploadedResults = await Promise.all(
            files.map(async (file) => await uploadSingleFile({ file }))
        );
        return uploadedResults;

    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error("Error while uploading multiple files");
        }
    }
}

export default {
    uploadSingleFile,
    uploadMultipleFiles,
}