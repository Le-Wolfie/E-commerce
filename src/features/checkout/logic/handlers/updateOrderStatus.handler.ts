import { Request, Response } from "express";
import { OrderModel } from "../../../checkout/data/models/order.model";

type HandlerRequest = Request<
  {
    orderId: string;
  },
  {},
  {
    orderStatus: string;
  }
>;

const updateOrderStatusHandler = async (req: HandlerRequest, res: Response) => {
  const { orderId } = req.params;
  const { orderStatus } = req.body;

  const order = await OrderModel.findByIdAndUpdate(
    orderId,
    { orderStatus },
    { new: true }
  );

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

export default updateOrderStatusHandler;
