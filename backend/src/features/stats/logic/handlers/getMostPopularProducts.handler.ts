import { Request, Response } from "express";
import { ProductModel } from "../../../product/data/models/product.model";
import { OrderModel } from "../../../checkout/data/models/order.model";

type HandlerRequest = Request<{}, {}, {}>;

const getMostPopularProductsHandler = async (
  req: HandlerRequest,
  res: Response
) => {
  // Get the products that have been ordered the most
  const mostPopularProducts = await OrderModel.aggregate([
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.product",
        count: { $sum: "$items.quantity" },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 5 },
  ]);

  const productIds = mostPopularProducts.map((product) => product._id);

  const products = await ProductModel.find(
    { _id: { $in: productIds } },
    {
      __v: 0,
      updatedAt: 0,
      createdAt: 0,
    }
  );

  const response = {
    mostPopularProducts: products,
  };

  res.status(200).json(response);
};

export default getMostPopularProductsHandler;
