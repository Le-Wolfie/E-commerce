import { Request, Response } from "express";
import { CartModel } from "../../../cart/data/models/cart.model";
import { TokenPayload } from "../../../../core/checkRole.middleware";
import { ProductModel } from "../../../product/data/models/product.model";

type HandlerRequest = Request<
  {},
  {},
  {
    user: TokenPayload;
    productCode: string;
    quantity: number;
    price: number;
  }
>;

const addItemToCartHandler = async (req: HandlerRequest, res: Response) => {
  const { user, productCode, quantity, price } = req.body;
  let cart = await CartModel.findOne({ user: user.userId });

  if (!cart) {
    cart = new CartModel({ user: user.userId, items: [] });
  }

  const product = await ProductModel.findOne({
    code: productCode,
  });

  if (!product) {
    res.status(404).json({
      errors: [
        {
          message: "Product not found",
        },
      ],
    });
    return;
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === product._id.toString()
  );
  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
    cart.items[itemIndex].price = price;
  } else {
    cart.items.push({ product: product._id, quantity, price });
  }

  await cart.save();
  res.status(200).json(cart);
};

export default addItemToCartHandler;
