import { Router } from 'express';
import routerUser from './user.route';

const route = Router();

route.use('/auth/user', routerUser);

export default route;
