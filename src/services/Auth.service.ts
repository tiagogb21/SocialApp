import { validationResult } from 'express-validator';

// SERVICE
import { MailService } from './Mail.service';
// INTERFACE
import { IModel } from '../@types/interfaces/IModel';
import { IUser } from '../@types/interfaces/IUser';
import { ILogin } from '../@types/interfaces/ILogin';
import { IToken } from '../@types/interfaces/IToken';
// UTILS
import { JWT } from '../utils/libs/JWT';
import { BCrypt } from '../utils/libs/BCrypt';
import { Crypto } from '../utils/libs/Crypto';
import { message, messages } from '../utils/data/messages';

const { DEVELOPERS_EMAIL, API_URL } = process.env;

const url = API_URL || 'http://localhost:8080';

export class AuthService {
  private _user: IModel<IUser>;
  private readonly _jwt: JWT;
  private readonly _bcrypt: BCrypt;
  private readonly _crypto: Crypto;
  private readonly _mailService: MailService;


  constructor(model: IModel<IUser>) {
    this._user = model;
    this._jwt = new JWT();
    this._bcrypt = new BCrypt();
    this._crypto = new Crypto();
    this._mailService = new MailService();
  }

  async register(user: IUser): Promise<IUser> {
    const userExists = await this._user.readOneByQuery({
      $or: [{ username: user.username }, { email: user.email }],
    });

    if (userExists) {
      throw new Error(message.alreadyExists('User'));
    }

    const hash = this._crypto.createRandom();

    const newUser = await this._user.create({ ...user, hash });

    await this._mailService.sendMail({
      from: DEVELOPERS_EMAIL!,
      to: newUser.email,
      subject: 'confirm your account',
      text: 'confirm your account',
      html: `<a href="${url}/api/v1/auth/confirm/${hash}">confirm your account</a>`,
    });

    return newUser;
  }

  async confirm(idHash: string): Promise<boolean> {
    const userExists = await this._user.readOneByQuery({ idHash });

    if (!userExists) {
      throw new Error(message.notFound('User'));
    }

    const { id, hash } = userExists as any;

    if (idHash !== hash) {
      throw new Error(messages.invalid('hash'));
    }

    userExists.isActive = true;

    const update = await this._user.update(id, userExists);

    if (!update) {
      throw new Error(message.notUpdated('User'));
    }

    return true;
  }

  async login(user: ILogin): Promise<IToken> {
    const { email, password } = user;

    const userExists = await this._user.readOneByQuery({ email });

    if (!userExists || !userExists.isActive) {
      throw new Error(message.notFound('User'));
    }

    const { _id } = userExists as any;

    const passwordMatch = await this._bcrypt.compare(
      password,
      userExists.confirm.password
    );

    if (!passwordMatch) {
      throw new Error(messages.invalid('password'));
    }

    const token = this._jwt.generate({ id: _id });

    const newUser = { ...userExists, token };

    const userUpdate = await this._user.update(_id, newUser);

    console.log(userUpdate);

    if(!userUpdate) {
      throw new Error(message.notUpdated('User'));
    }

    return {
      token,
    };
  }

  async logout(user: IUser): Promise<boolean> {
    const { email } = user;

    user.token = '';

    const findUser = await this._user.readOneByQuery({ email });

    if (!findUser) {
      throw new Error(message.notFound('User'));
    }

    const { _id } = findUser as any;

    await this._user.update(_id, findUser);

    return true;
  }

  async forgotPassword(user: IUser): Promise<IUser> {
    const { email } = user;

    const userExists = await this._user.readOneByQuery({
      email,
    });

    if (!userExists) {
      throw new Error(message.notFound('User'));
    }

    const { _id } = userExists as any;

    const hash = this._crypto.createRandom();

    userExists.hash = hash;

    await this._user.update(_id, userExists);

    await this._mailService.sendMail({
      from: DEVELOPERS_EMAIL!,
      to: userExists.email,
      subject: 'reset your password',
      text: 'reset your password',
      html: `<a href="${url}/api/v1/auth/reset/${hash}">reset your password</a>`,
    });

    return user;
  }

  async resetPassword(user: IUser): Promise<IUser> {
    const { email, confirm: { password } } = user;

    const userExists = await this._user.readOneByQuery({
      email,
    });

    if (!userExists) {
      throw new Error(message.notFound('User'));
    }

    const hashPassword = await this._bcrypt.hash(password);

    const { _id } = userExists as any;

    if (hashPassword !== userExists.hash) {
      throw new Error(messages.invalid('hash'));
    }

    const newPassword = await this._bcrypt.hash(password);

    userExists.confirm.password = newPassword;

    await this._user.update(_id, userExists);

    return user;
  }
}
