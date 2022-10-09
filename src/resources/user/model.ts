import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserDocument } from './interface';

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    mobile: { type: String },
    email: { type: String },
    password: { type: String, required: true },
    stores: [{ type: Schema.Types.ObjectId, ref: 'Store' }],
    role: { type: Schema.Types.ObjectId, ref: 'Role' },
  },
  { timestamps: true }
);

UserSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (
  password: string
): Promise<Error | boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<UserDocument>('User', UserSchema, 'User');
