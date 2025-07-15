
import { Router } from 'express';
import libraryController from '../controllers/library.controller';
import { authenticateToken } from '../middlewares/auth.middleware';


const router = Router();
router.use(authenticateToken);
router.
    post('/new', libraryController.createLibrary)
    .post('/getAll', libraryController.getLibraries)
    .post('/createBulk',libraryController.createBulkLibraries)
    .get('/get/:libId', libraryController.getLibraryById)
    .put("/update/:libId", libraryController.updateLibraryInfo)
    .delete('/delete/:libId', libraryController.deleteLibrary)
    .put('/updateBulk', libraryController.updateBulkLibraries)
    .get('/search/:searchStr', libraryController.searchLibrary)
    .get('/getAllPaginated', libraryController.getLibrariesPaginated)
    .get('/total', libraryController.getLibTotalCount);

export default router; 