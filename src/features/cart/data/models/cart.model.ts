import mongoose, { Document, Schema } from "mongoose";

interface ICartItem {
  [x: string]: any;
  product: mongoose.Schema.Types.ObjectId;
  quantity: number;
  price: number;
}

interface ICart extends Document {
  user: mongoose.Schema.Types.ObjectId;
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

const CartItemSchema: Schema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const CartSchema: Schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [CartItemSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const CartModel = mongoose.model<ICart>("Cart", CartSchema);

export { ICart, CartModel };
