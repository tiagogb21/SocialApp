import { Router } from 'express';
import routerUser from './user.route';

const route = Router();

route.use('/api/v1', routerUser);

export default route;
