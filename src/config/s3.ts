import { S3Client } from '@aws-sdk/client-s3';
import { fromEnv } from '@aws-sdk/credential-provider-env';
import dotenv from 'dotenv';
dotenv.config();


if (
    !process.env.AWS_ACCESS_KEY_ID ||
    !process.env.AWS_SECRET_ACCESS_KEY ||
    !process.env.AWS_REGION
) {
    throw new Error("AWS credentials or region are not set in .env");
}

export const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

/* To avoid manual validation  */
const s3Eextra = new S3Client({
    region: process.env.AWS_REGION,
    credentials: fromEnv(),
});

