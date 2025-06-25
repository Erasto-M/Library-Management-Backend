

import shelfController from "../controllers/shelf.controller";
import { authenticateToken } from "../middlewares/auth.middleware";


import {Router} from  'express';
const router = Router();

router.use(authenticateToken);
router.post('/new', shelfController.createShelf)
      .get('/getAll', shelfController.getAllShelves)
      .get('/libraryShelves/:libId', shelfController.getShelvesForLibrary);

export default router;
