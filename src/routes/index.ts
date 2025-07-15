import { Router } from 'express';
import userRoutes from '../routes/user.routes';
import libraryRoutes from '../routes/library.routes';
import shelfRoutes from '../routes/shelf.routes';
import uploadRoutes from '../routes/uploads.routes';


const router = Router();

const defaultRoutes = [
    {
        'path': '/users',
        "route": userRoutes,
    }, 
    {
        'path': '/library',
        "route": libraryRoutes, 
    },
    { 
        "path": '/shelf',
        "route": shelfRoutes,
    },
    {
        "path": '/file/uploads',
        "route": uploadRoutes,
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;