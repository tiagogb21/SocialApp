import { model as mongooseCreateModel, Schema } from 'mongoose';
import { BCrypt } from '../../utils/libs/BCrypt';

import { IUser } from '../../@types/interfaces/IUser';
import MongoModel from './Generic.model';

const bcrypt = new BCrypt();

const usersMongoSchema = new Schema<IUser>({
  name: String,
  username: String,
  email: String,
  confirm: {
    password: String,
    passwordConfirmation: String,
  },
  photo: String,
  isActive: { type: Boolean, default: false },
  hash: { type: String, default: '' },
  token: { type: String, default: '' },
});

usersMongoSchema.pre('save', async function (next) {
  const {password, passwordConfirmation} = this.confirm;

  this.confirm.password = await bcrypt.hash(password);

  this.confirm.passwordConfirmation = await bcrypt.hash(passwordConfirmation);

  next();
});

class UsersModel extends MongoModel<IUser> {
  constructor(model = mongooseCreateModel('users', usersMongoSchema)) {
    super(model);
  }
}

export default UsersModel;
