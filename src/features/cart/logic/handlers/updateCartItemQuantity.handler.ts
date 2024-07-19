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
    quantity: number;
  }
>;

const updateCartItemQuantityHandler = async (
  req: HandlerRequest,
  res: Response
) => {
  const { itemId } = req.params;
  const { user, quantity } = req.body;

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

  const itemIndex = cart.items.findIndex(
    (item) => item._id.toString() === itemId
  );

  if (itemIndex === -1) {
    res.status(404).json({
      errors: [
        {
          message: "Item not found",
        },
      ],
    });
    return;
  }

  cart.items[itemIndex].quantity = quantity;
  await cart.save();

  res.status(200).json(cart);
};

export default updateCartItemQuantityHandler;
