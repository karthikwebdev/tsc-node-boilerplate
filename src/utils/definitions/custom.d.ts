import { UserDocument } from '@resources/user/interface';

declare global {
  namespace Express {
    export interface Request {
      user: UserDocument;
      store: string;
      filePath: string;
    }
  }
}
