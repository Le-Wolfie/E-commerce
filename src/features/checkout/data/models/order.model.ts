import mongoose, { Document, Schema } from "mongoose";

export const paymentStatusEnum = ["PENDING", "PAID", "CANCELLED"] as const;
export type paymentStatusEnumType = (typeof paymentStatusEnum)[number];

export const orderStatusEnum = [
  "PENDING",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
] as const;
export type orderStatusEnumType = (typeof orderStatusEnum)[number];

export interface IOrderItem {
  product: mongoose.Schema.Types.ObjectId;
  quantity: number;
  price: number;
}

interface IOrder extends Document {
  user: mongoose.Schema.Types.ObjectId;
  items: IOrderItem[];
  shippingAddress: string;
  paymentStatus: string;
  totalPrice: number;
  orderStatus: string;
  orderMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema: Schema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const OrderSchema: Schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [OrderItemSchema],
  shippingAddress: { type: String, required: true },
  paymentStatus: { type: String, required: true, enum: paymentStatusEnum },
  totalPrice: { type: Number, required: true },
  orderStatus: {
    type: String,
    required: true,
    enum: orderStatusEnum,
  },
  orderMessage: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const OrderModel = mongoose.model<IOrder>("Order", OrderSchema);

export { IOrder, OrderModel };
