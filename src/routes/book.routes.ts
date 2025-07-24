import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware';
import bookController from '../controllers/book.controller';

const router = Router();

router
      .post('/new', authenticateToken , bookController.addNewBook)
      .get('/getAll', authenticateToken, bookController.getAllBooks)
      .post('/:bookId', authenticateToken , bookController.getBookById);

export default router;