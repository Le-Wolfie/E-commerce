import { Request, Response } from "express";
import { CartModel } from "../../../cart/data/models/cart.model";
import { TokenPayload } from "../../../../core/checkRole.middleware";

type HandlerRequest = Request<
  {
    itemId: string;
  },
  {},
  {
    user: TokenPayload;
  }
>;

const removeItemFromCartHandler = async (
  req: HandlerRequest,
  res: Response
) => {
  const { itemId } = req.params;
  const { user } = req.body;

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

  cart.items = cart.items.filter((item) => item._id.toString() !== itemId);
  await cart.save();

  res.status(200).json(cart);
};

export default removeItemFromCartHandler;
