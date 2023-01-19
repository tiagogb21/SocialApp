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
  isActive: Boolean,
});

usersMongoSchema.pre('save', async function (next) {
  const {password, passwordConfirmation} = this.confirm;

  if (!this.isModified('password')) return next();

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
