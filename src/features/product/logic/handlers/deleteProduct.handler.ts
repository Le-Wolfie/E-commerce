import { Request, Response } from "express";
import { ProductModel } from "../../../product/data/models/product.model";

type HandlerRequest = Request<
  {
    code: string;
  },
  {},
  {}
>;

const deleteProductHandler = async (req: HandlerRequest, res: Response) => {
  const { code } = req.params;
  const productToDelete = await ProductModel.findOneAndDelete({
    code: code,
  });
  if (!productToDelete) {
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
    message: "Product deleted successfully",
    product: {
      id: productToDelete._id,
      code: productToDelete.code,
      name: productToDelete.name,
      description: productToDelete.description,
      price: productToDelete.price,
      category: productToDelete.category,
      stock: productToDelete.stock,
    },
  };

  res.status(200).json(response);
};

export default deleteProductHandler;
