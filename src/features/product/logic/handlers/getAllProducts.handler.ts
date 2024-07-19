import { Request, Response } from "express";
import { ProductModel } from "../../../product/data/models/product.model";

const getAllProductsHandler = async (req: Request, res: Response) => {
  const { category, price } = req.query;

  let filter: Record<string, any> = {};

  if (category) {
    filter.category = category;
  }

  if (price) {
    // Assuming price is passed as a range in the format "min-max"
    const [minPrice, maxPrice] = (price as string).split("-").map(Number);
    filter.price = { $gte: minPrice, $lte: maxPrice };
  }

  const products = await ProductModel.find(filter)
    .skip(req.skip ?? 0)
    .limit(req.query.limit as unknown as number);
  const total = await ProductModel.countDocuments(filter);

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
