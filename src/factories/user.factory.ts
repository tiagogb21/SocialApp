import UserController from "../controllers/User.controller";
import UsersModel from "../database/models/User.model";
import UserService from "../services/User.service";

const userModel = new UsersModel()
export const userModelService = new UserService(userModel);
export const userModelController = new UserController(userModelService);
