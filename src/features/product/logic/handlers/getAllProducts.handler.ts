import { Request, Response } from "express";
import { ProductModel } from "../../../product/data/models/product.model";

const getAllProductsHandler = async (req: Request, res: Response) => {
  const products = await ProductModel.find({})
    .skip(req.skip ?? 0)
    .limit(req.query.limit as unknown as number);
  const total = await ProductModel.countDocuments({});

  const response = {
    products: products.map((product) => ({
      id: product._id,
      code: product.code,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    })),
    total,
  };

  res.status(200).json(response);
};

export default getAllProductsHandler;
