import { Request, Response } from "express";
import { TokenPayload } from "../../../../core/checkRole.middleware";
import {
  IOrderItem,
  OrderModel,
  orderStatusEnum,
  paymentStatusEnum,
} from "../../../checkout/data/models/order.model";
import { ProductModel } from "../../../product/data/models/product.model";
import { CustomerModel } from "../../../auth/data/models/customer.model";
import { CartModel } from "../../../cart/data/models/cart.model";

type HandlerRequest = Request<
  {},
  {},
  {
    user: TokenPayload;
    items: IOrderItem[];
    totalPrice: number;
  }
>;

const createOrderHandler = async (req: HandlerRequest, res: Response) => {
  const { user, items, totalPrice } = req.body;
  const customer = await CustomerModel.findOne({ _id: user.userId });

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
    shippingAddress: customer.address,
    paymentStatus: paymentStatusEnum[1],
    totalPrice,
    orderStatus: orderStatusEnum[0],
  });

  // empty the user's cart
  const cart = await CartModel.findOne({ user: user.userId });
  if (!cart) {
    res.status(404).json({
      errors: [
        {
          message: "Cart not found",
        },
      ],
    });
    return;
  }

  cart.items = [];
  await cart.save();

  const response = {
    message: "Order created successfully",
    order,
  };

  res.status(201).json(response);
};

export default createOrderHandler;
