import { Request, Response } from "express";
import { OrderModel } from "../../../checkout/data/models/order.model";

type HandlerRequest = Request<
  {
    orderId: string;
  },
  {},
  {}
>;

const trackOrderStatusHandler = async (req: HandlerRequest, res: Response) => {
  const { orderId } = req.params;

  const order = await OrderModel.findById(orderId);

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

  const response = {
    orderStatus: order.orderStatus,
  };

  res.status(200).json(response);
};

export default trackOrderStatusHandler;
