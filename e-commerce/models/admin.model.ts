import { Schema } from "mongoose";
import { UserModel, IUser } from "./user.model";

export interface IAdmin extends IUser {}

const AdminSchema: Schema = new Schema({});

const AdminModel = UserModel.discriminator<IAdmin>("AdminModel", AdminSchema);

export { AdminModel };
