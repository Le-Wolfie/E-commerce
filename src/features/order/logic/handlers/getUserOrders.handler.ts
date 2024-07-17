import { Request, Response } from "express";
import { OrderModel } from "../../../checkout/data/models/order.model";
import { TokenPayload } from "../../../../core/checkRole.middleware";

type HandlerRequest = Request<
  {},
  {},
  {
    user: TokenPayload;
  }
>;

const getAuthenticatedUserOrdersHandler = async (
  req: HandlerRequest,
  res: Response
) => {
  const { user } = req.body;

  // find all this user's orders
  const orders = await OrderModel.find({ user: user.userId })
    .skip(req.skip ?? 0)
    .limit(req.query.limit as unknown as number)
    .populate("items.product");

  if (orders.length === 0) {
    res.status(404).json({
      errors: [
        {
          message: "Order not found",
        },
      ],
    });
    return;
  }

  const total = await OrderModel.countDocuments({ user: user.userId });

  const response = {
    orders,
    total,
  };

  res.status(200).json(response);
};

export default getAuthenticatedUserOrdersHandler;
