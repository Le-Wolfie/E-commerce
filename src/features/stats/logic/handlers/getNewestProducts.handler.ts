import { Request, Response } from "express";
import { ProductModel } from "../../../product/data/models/product.model";

type HandlerRequest = Request<{}, {}, {}>;

const getNewestProductsHandler = async (req: HandlerRequest, res: Response) => {
  // Get the newest products
  const products = await ProductModel.find()
    .sort({ createdAt: -1 })
    .skip(req.skip ?? 0)
    .limit(req.query.limit as unknown as number);

  const response = {
    products,
  };

  res.status(200).json(response);
};

export default getNewestProductsHandler;
