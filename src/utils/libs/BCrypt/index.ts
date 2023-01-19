import bcrypt from 'bcrypt';
import { saltRounds } from '../../data/constants';

export class BCrypt {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, saltRounds);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
