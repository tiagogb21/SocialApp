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

const routerUser = Router();

const modelUser = new UserModel();
const modelService = new UserService(modelUser);
const modelUserController = new UserController(modelService);

routerUser.post(
  '/',
  validateBody(userZodSchema),
  (req, res) => modelUserController.create(req, res),
);

routerUser.get(
  '/',
  (req, res) => modelUserController.read(req, res),
);

routerUser.get(
  '/:id',
  validId,
  (req, res) => modelUserController.readOne(req, res),
);

routerUser.put(
  '/:id',
  validId,
  (req, res) => modelUserController.update(req, res),
);

routerUser.delete(
  '/:id',
  validId,
  (req, res) => modelUserController.delete(req, res),
);

export default routerUser;
