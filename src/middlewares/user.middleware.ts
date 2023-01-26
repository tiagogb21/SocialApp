import { Request, Response, NextFunction } from "express";

// INTERFACES
import { IModel } from "../@types/interfaces/IModel";
import { IUser } from "../@types/interfaces/IUser";
// MODELS
import UsersModel from "../database/models/User.model";

export const validateCreate = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const model: IModel<IUser> = new UsersModel();

  const { email, username } = req.body;

  const findUser = await model.readOneByQuery({
    $or: [{ username }, { email }],
  });

  if (findUser) throw new Error("User already exists");

  next();
};

export const verifyFindUser = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const model: IModel<IUser> = new UsersModel();

  const { id } = req.params;

  const findUser = await model.readOne(id);

  if (!findUser) throw new Error("User not found");

  next();
};
