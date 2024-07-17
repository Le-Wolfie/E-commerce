import { Schema } from "mongoose";
import { UserModel, IUser } from "./user.model";

export interface ISeller extends IUser {
  storeName: string;
}

const SellerSchema: Schema = new Schema({
  storeName: { type: String, required: true },
});

const SellerModel = UserModel.discriminator<ISeller>(
  "SellerModel",
  SellerSchema
);

export { SellerModel };
