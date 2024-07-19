import { Request, Response } from "express";
import { ProductModel } from "../../../product/data/models/product.model";
type HandlerRequest = Request<
  { code: string },
  {},
  {
    name?: string;
    description?: string;
    price?: number;
    category?: string;
    stock?: number;
  }
>;

const updateProductHandler = async (req: HandlerRequest, res: Response) => {
  const { code } = req.params;

  const { name, description, price, category, stock } = req.body;

  const productToUpdate = await ProductModel.findOneAndUpdate(
    { code: code },
    {
      ...(name && { name }),
      ...(description && { description }),
      ...(price && { price }),
      ...(category && { category }),
      ...(stock && { stock }),
    },
    { new: true }
  );

  if (!productToUpdate) {
    res.status(404).json({
      errors: [
        {
          message: "Product not found",
        },
      ],
    });
    return;
  }

  const response = {
    message: "Product updated successfully",
    product: {
      id: productToUpdate._id,
      code: productToUpdate.code,
      name: productToUpdate.name,
      description: productToUpdate.description,
      price: productToUpdate.price,
      category: productToUpdate.category,
      stock: productToUpdate.stock,
    },
  };

  res.status(200).json(response);
};

export default updateProductHandler;
