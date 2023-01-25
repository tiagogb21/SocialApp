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

  async create(obj:IUser):Promise<IUser> {
    const { email } = obj;

    const findUser = await this._user.readOneByQuery({
      $or: [{ username: obj.username }, { email: obj.email }],
    });

    if(findUser) throw new Error('User already exists');

    return this._user.create(obj);
  }

  async read(): Promise<IUser[] | null> {
    const readUser = await this._user.read();
    return readUser;
  }

  async readOne(_id: string): Promise<IUser | null> {
    const readOneUser = await this._user.readOne(_id);
    if (!readOneUser) throw new Error('Object not found');
    return readOneUser;
  }

  async update(_id: string, obj: IUser): Promise<IUser | null> {
    const updateUser = await this._user.update(_id, obj);
    if (!updateUser) throw new Error('Object not found');
    return updateUser;
  }

  async delete(_id: string): Promise<IUser | null> {
    const deleteUser = await this._user.delete(_id);
    if (!deleteUser) throw new Error('EntityNotFound');
    return deleteUser;
  }
}
