import mongoose, { Document, Schema } from "mongoose";

// Define the role enum
export const RoleEnum = ["ADMIN", "SELLER", "CUSTOMER"] as const;
export type RoleEnumType = (typeof RoleEnum)[number];

// Define the model name
export const userModelName = "User";

// Define the user interface
export interface IUser extends Document {
  email: string;
  password: string;
  role: RoleEnumType;
  createdAt: Date;
  updatedAt: Date;
}

// Define the user type without mongoose document fields
export type UserType = Omit<IUser, keyof Document>;

// Create the user schema
const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: RoleEnum },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Export the user model
export const UserModel =
  mongoose.models.User || mongoose.model<IUser>(userModelName, userSchema);
