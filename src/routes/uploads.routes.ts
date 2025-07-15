import { Router } from "express";
import { authenticateToken, authorize } from '../middlewares/auth.middleware';
import uploadsController from "../controllers/uploads.controller";
import upload from "../config/upload";

const router = Router();

router
    .post('/single', upload.single('file'), authenticateToken, uploadsController.uploadSingleFile)
    .post('/bulk', upload.array('files'), authenticateToken, uploadsController.uploadMultipleFiles);

export default router;