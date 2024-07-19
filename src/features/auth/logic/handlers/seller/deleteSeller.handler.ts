import { Request, Response } from "express";
import { SellerModel } from "../../../data/models/seller.model";

type HandlerRequest = Request<
  {},
  {},
  {
    email: string;
  }
>;

const deleteSellerHandler = async (req: HandlerRequest, res: Response) => {
  const { email } = req.body;
  const sellerToDelete = await SellerModel.findOneAndDelete({
    email: email,
  });
  if (!sellerToDelete) {
    res.status(404).json({
      errors: [
        {
          message: "Seller not found",
        },
      ],
    });
    return;
  }

  const response = {
    message: "Seller deleted successfully",
    seller: {
      id: sellerToDelete._id,
      email: sellerToDelete.email,
      role: sellerToDelete.role,
      storeName: sellerToDelete.storeName,
    },
  };

  res.status(200).json(response);
};

export default deleteSellerHandler;
