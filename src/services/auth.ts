import bcrypt from 'bcrypt';
import config from 'config'
import jwt from 'jsonwebtoken'

//version of the user that is send to via API and decoded from the Json Web Token
// export interface DecodedUser extends Omit<User, '_id'> {
//   id: string;
// }

// LGPD e JSON Web Token
export interface JwtToken {
  sub: string;
}

export default class AuthService {
  public static async hashPassword(
    password: string,
    salt = 10
  ): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  public static async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  // public static generateToken(payload: object): string {
  //   return jwt.sign(payload, config.get('App.auth.key'), {
  //     expiresIn: config.get('App.auth.tokenExpiresIn'),
  //   });
  // }

  // LGPD e JSON Web Token
  public static generateToken(sub: string): string {
    return jwt.sign({ sub }, config.get('App.auth.key'), {
      expiresIn: config.get('App.auth.tokenExpiresIn'),
    });
  }

  // public static decodeToken(token: string): DecodedUser {
  //   return jwt.verify(token, config.get('App.auth.key')) as DecodedUser;
  // }

  // LGPD e JSON Web Token
  public static decodeToken(token: string): JwtToken {
    return jwt.verify(token, config.get('App.auth.key')) as JwtToken;
  }
}