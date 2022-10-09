import { Document } from 'mongoose';

export interface User {
  username: string;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  password: string;
  role: string;
}

export interface UserMethods {
  isValidPassword: (password: string) => Promise<Error | boolean>;
}

export interface UserDocument extends Document, User, UserMethods {}
