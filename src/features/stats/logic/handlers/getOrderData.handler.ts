import { Request, Response } from "express";
import { OrderModel } from "../../../checkout/data/models/order.model";

const getOrderDataHandler = async (req: Request, res: Response) => {
  const orders = await OrderModel.find(
    {},
    { __v: 0, updatedAt: 0, createdAt: 0 }
  )
    .skip(req.skip ?? 0)
    .limit(req.query.limit as unknown as number)
    .populate("user", "email -_id -__t")
    .populate("items", "quantity -_id")
    .populate("items.product", "code name -_id ");

  const total = await OrderModel.countDocuments();

  const response = {
    orders,
    total,
  };

  res.status(200).json(response);
};

export default getOrderDataHandler;
