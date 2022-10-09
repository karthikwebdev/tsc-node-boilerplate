import UserModel from './model';
import { createToken } from '@utils/token';
import { User, UserDocument } from './interface';

class UserService {
  private user = UserModel;

  public async register(user: User): Promise<undefined | Error> {
    try {
      await this.user.create<User>(user);
      return;
    } catch (error) {
      throw new Error('Unable to register user');
    }
  }

  public async login(
    username: string,
    password: string,
    isRememberEnabled: boolean = false
  ): Promise<{ token: string; user: Partial<UserDocument> | null } | Error> {
    try {
      const user = await this.user
        .findOne({ username })
        .populate('stores')
        .populate('role');
      if (!user) {
        throw new Error('No user found with Username ' + username);
      }

      if (await user.isValidPassword(password)) {
        const { _id, firstName, lastName, username, role } = user;
        return {
          token: createToken(user, isRememberEnabled),
          user: { _id, firstName, lastName, username, role },
        };
      } else {
        throw new Error('Invalid password');
      }
    } catch (error: any) {
      throw new Error(error.message || 'Unable to login user');
    }
  }
}

export default UserService;
