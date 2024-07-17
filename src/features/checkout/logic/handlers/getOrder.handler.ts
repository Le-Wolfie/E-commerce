import { Request, Response } from "express";
import { OrderModel } from "../../../checkout/data/models/order.model";

type HandlerRequest = Request<
  {
    orderId: string;
  },
  {},
  {}
>;

const getOrderHandler = async (req: HandlerRequest, res: Response) => {
  const { orderId } = req.params;

  const order = await OrderModel.findById(orderId).populate("items.product");

  if (!order) {
    res.status(404).json({
      errors: [
        {
          message: "Order not found",
        },
      ],
    });
    return;
  }

  res.status(200).json(order);
};

export default getOrderHandler;
