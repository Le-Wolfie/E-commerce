import { Request, Response } from "express";
import { ProductModel } from "../../../product/data/models/product.model";
type HandlerRequest = Request<{ code: string }, {}, {}>;

const getProductByCodeHandler = async (req: HandlerRequest, res: Response) => {
  const { code } = req.params;

  const product = await ProductModel.findOne({
    code: code,
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

  const response = {
    product: {
      id: product._id,
      code: product.code,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    },
  };

  res.status(200).json(response);
};

export default getProductByCodeHandler;
