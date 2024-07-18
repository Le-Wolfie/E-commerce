import { Request, Response } from "express";
import { TokenPayload } from "../../../../core/checkRole.middleware";
import {
  IOrderItem,
  OrderModel,
} from "../../../checkout/data/models/order.model";
import { UserModel } from "../../../auth/data/models/user.model";
import { ProductModel } from "../../../product/data/models/product.model";

type HandlerRequest = Request<
  {},
  {},
  {
    user: TokenPayload;
    items: IOrderItem[];
    shippingAddress: string;
    paymentStatus: string;
    totalPrice: number;
    orderStatus: string;
  }
>;

const createOrderHandler = async (req: HandlerRequest, res: Response) => {
  const {
    user,
    items,
    shippingAddress,
    paymentStatus,
    totalPrice,
    orderStatus,
  } = req.body;
  const customer = await UserModel.findOne({ _id: user.userId });

  if (!customer) {
    res.status(404).json({
      errors: [
        {
          message: "Customer not found",
        },
      ],
    });
    return;
  }

  // check if all products exist
  for (const item of items) {
    const product = await ProductModel.findById(item.product);
    if (!product) {
      res.status(404).json({
        errors: [
          {
            message: `Product with id ${item.product} not found`,
          },
        ],
      });
      return;
    }
  }

  const order = await OrderModel.create({
    user: customer._id,
    items,
    shippingAddress,
    paymentStatus,
    totalPrice,
    orderStatus,
  });

  const response = {
    message: "Order created successfully",
    order,
  };

  res.status(201).json(response);
};

export default createOrderHandler;
