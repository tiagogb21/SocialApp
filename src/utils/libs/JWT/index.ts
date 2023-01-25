import jwt from 'jsonwebtoken';

const {JWT_SECRET} = process.env;

export class JWT {
  private _secret: string;

  constructor(
    secret = JWT_SECRET!,
  ) {
    this._secret = secret;
  }

  generate(payload: object) {
    return jwt.sign(payload, this._secret);
  }

  verify(token: string) {
    return jwt.verify(token, this._secret);
  }
}
