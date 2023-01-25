import { isValidObjectId, Model, UpdateQuery } from 'mongoose';
import { IModel } from '../../@types/interfaces/IModel';

const checkId = (_id: string): void => {
  if (!isValidObjectId(_id)) throw Error('InvalidMongoId');
}

abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  async create(obj:T):Promise<T> {
    const createQuery = this._model.create({ ...obj })
    return createQuery;
  }

  async readOne(_id: string): Promise<T | null> {
    checkId(_id);
    const findOneQuery = this._model.findOne({ _id });
    return findOneQuery;
  }

  async readOneByQuery(query: object): Promise<T | null> {
    const findOneQuery = this._model.findOne(query);
    return findOneQuery;
  }

  async read():Promise<T[] | null> {
    const find = this._model.find({});
    return find;
  }

  async update(_id: string, obj:UpdateQuery<T>): Promise<T | null> {
    checkId(_id);
    const updateQuery = this._model.findByIdAndUpdate({ _id }, obj);
    return updateQuery;
  }

  async delete(_id: string): Promise<T | null> {
    checkId(_id);
    const deleteQuery = this._model.findByIdAndDelete({ _id });
    return deleteQuery;
  }
}

export default MongoModel;
