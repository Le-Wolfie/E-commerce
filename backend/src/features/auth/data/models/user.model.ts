import mongoose, { Document, Schema } from "mongoose";
import { Role } from "../../../../core/checkRole.middleware";

interface IUser extends Document {
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: Object.values(Role) },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.model<IUser>("User", UserSchema);

export { IUser, UserModel };
