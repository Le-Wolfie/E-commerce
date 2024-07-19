import { Request, Response } from "express";
import { ProductModel } from "../../../product/data/models/product.model";

type HandlerRequest = Request<{}, {}, {}>;

const getNewestProductsHandler = async (req: HandlerRequest, res: Response) => {
  // Get the newest products
  const products = await ProductModel.find().sort({ createdAt: -1 }).limit(5);

  const response = {
    newestProducts: products,
  };

  res.status(200).json(response);
};

export default getNewestProductsHandler;
