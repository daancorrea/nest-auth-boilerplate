import * as bcrypt from 'bcrypt';
export const SALT_ROUNDS = 10;

export class Hasher {
  static async makeHash(plainText: string): Promise<string> {
    return bcrypt.hash(plainText, SALT_ROUNDS);
  }

  static async compareHash(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
