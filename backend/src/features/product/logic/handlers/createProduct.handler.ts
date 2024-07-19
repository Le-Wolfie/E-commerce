import { Request, Response } from "express";
import { ProductModel } from "../../../product/data/models/product.model";

type HandlerRequest = Request<
  {},
  {},
  {
    code: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
  }
>;

const createProductHandler = async (req: HandlerRequest, res: Response) => {
  const { code, name, description, price, category, stock } = req.body;

  const createdProduct = await ProductModel.create({
    code,
    name,
    description,
    price,
    category,
    stock,
  });

  const response = {
    message: "Product created successfully",
    product: {
      id: createdProduct._id,
      code: createdProduct.code,
      name: createdProduct.name,
      description: createdProduct.description,
      price: createdProduct.price,
      category: createdProduct.category,
      stock: createdProduct.stock,
    },
  };

  res.status(201).json(response);
};

export default createProductHandler;
