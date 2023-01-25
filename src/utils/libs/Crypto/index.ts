import crypto from 'crypto';
import { ALGORITHM, HEX } from '../../data/constants';

export class Crypto {
  constructor() {}

  createRandom(): string {
    const random = crypto.randomBytes(64).toString(HEX);
    return random;
  }
}
