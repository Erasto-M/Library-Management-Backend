import { Router } from 'express';
import userRoutes from '../routes/user.routes';
import libraryRoutes from '../routes/library.routes';

const router = Router();

const defaultRoutes = [
    {
        'path': '/users',
        "route": userRoutes,
    }, 
    {
        'path': '/library',
        "route": libraryRoutes, 
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;