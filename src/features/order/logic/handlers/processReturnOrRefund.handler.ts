import { Request, Response } from "express";
import {
  OrderModel,
  orderStatusEnum,
} from "../../../checkout/data/models/order.model";

type HandlerRequest = Request<
  {
    orderId: string;
  },
  {},
  {
    returnReason: string;
  }
>;

const processReturnOrRefundHandler = async (
  req: HandlerRequest,
  res: Response
) => {
  const { returnReason } = req.body;
  const { orderId } = req.params;
  const order = await OrderModel.findByIdAndUpdate(
    orderId,
    {
      orderStatus: orderStatusEnum[4],
      orderMessage: returnReason,
    },
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

  const response = {
    orderStatus: order.orderStatus,
    orderMessage: order.orderMessage,
  };

  res.status(200).json(response);
};

export default processReturnOrRefundHandler;
