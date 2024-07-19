import { Request, Response } from "express";
import { CartModel } from "../../../cart/data/models/cart.model";
import { TokenPayload } from "../../../../core/checkRole.middleware";

type HandlerRequest = Request<
  {},
  {},
  {
    user: TokenPayload;
  }
>;

const getCartHandler = async (req: HandlerRequest, res: Response) => {
  const { user } = req.body;

  const cart = await CartModel.findOne({ user: user.userId })
    .populate("user")
    .populate("items.product");

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

  const response = {
    cart,
  };

  res.status(200).json(response);
};

export default getCartHandler;
