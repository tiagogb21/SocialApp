// SERVICE
import { IService } from '../@types/interfaces/IService';
// MODEL
import { IModel } from '../@types/interfaces/IModel';
// INTERFACE
import { IUser } from '../@types/interfaces/IUser';

export default class UserService implements IService<IUser> {
  private _user:IModel<IUser>;

  constructor(model:IModel<IUser>) {
    this._user = model;
  }

  async create(user: IUser): Promise<IUser> {
    const newUser = this._user.create(user);
    return newUser;
  }

  async read(): Promise<IUser[] | null> {
    const readUser = await this._user.read();
    return readUser;
  }

  async readOne(_id: string): Promise<IUser | null> {
    const readOneUser = await this._user.readOne(_id);
    return readOneUser;
  }

  async update(_id: string, obj: IUser): Promise<IUser | null> {
    const updateUser = await this._user.update(_id, obj);
    return updateUser;
  }

  async delete(_id: string): Promise<IUser | null> {
    const deleteUser = await this._user.delete(_id);
    return deleteUser;
  }
}
