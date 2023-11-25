import * as bcrypt from 'bcrypt';

export class Utils {
  static getHashedPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  static comparePassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }
}
