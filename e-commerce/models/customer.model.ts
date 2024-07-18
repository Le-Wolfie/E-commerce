import { Schema } from "mongoose";
import { UserModel, IUser } from "./user.model";

export interface ICustomer extends IUser {
  address: string;
}

const CustomerSchema: Schema = new Schema({
  address: { type: String, default: null },
});

const CustomerModel = UserModel.discriminator<ICustomer>(
  "CustomerModel",
  CustomerSchema
);

export { CustomerModel };