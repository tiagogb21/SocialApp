import { Router } from 'express';

// MODEL
import UserModel from '../database/models/User.model';
// CONTROLLER
import UserController from '../controllers/User.controller';
// SERVICE
import UserService from '../services/User.service';
// MIDDLEWARE
import validateBody from '../middlewares/generic.middleware';
import validId from '../middlewares/id.middleware';
// INTERFACE
import { userZodSchema } from '../utils/libs/Zod/schemas/user.schema';
import { AuthService } from '../services/Auth.service';
import AuthController from '../controllers/Auth.controller';

const routerUser = Router();

const modelUser = new UserModel();
const userModelService = new UserService(modelUser);
const userModelController = new UserController(userModelService);

const authModelService = new AuthService(modelUser);
const authModelController = new AuthController(authModelService);

routerUser.post(
  '/auth/register',
  validateBody(userZodSchema),
  (req, res) => authModelController.register(req, res),
);

routerUser.get(
  '/auth/confirm/:hash',
  (req, res) => authModelController.confirm(req, res),
);

routerUser.post(
  '/auth/login',
  (req, res) => authModelController.login(req, res),
);

routerUser.get(
  '/user',
  (req, res) => userModelController.read(req, res),
);

routerUser.get(
  '/user/:id',
  validId,
  (req, res) => userModelController.readOne(req, res),
);

routerUser.put(
  '/user/:id',
  validId,
  (req, res) => userModelController.update(req, res),
);

routerUser.delete(
  '/user/:id',
  validId,
  (req, res) => userModelController.delete(req, res),
);

export default routerUser;
