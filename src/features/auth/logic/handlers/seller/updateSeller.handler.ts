import { Request, Response } from "express";
import { TokenPayload } from "../../../../../core/checkRole.middleware";
import { SellerModel } from "../../../data/models/seller.model";

type HandlerRequest = Request<
  {},
  {},
  {
    email?: string;
    storeName?: string;
    user: TokenPayload;
  }
>;

const updateSellerHandler = async (req: HandlerRequest, res: Response) => {
  const { email, user, storeName } = req.body;
  const sellerToUpdate = await SellerModel.findOneAndUpdate(
    { _id: user.userId },
    { ...(email && { email }), ...(storeName && { storeName }) },
    { new: true }
  );

  if (!sellerToUpdate) {
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
    message: "Seller updated successfully",
    seller: {
      id: sellerToUpdate._id,
      email: sellerToUpdate.email,
      role: sellerToUpdate.role,
      storeName: sellerToUpdate.storeName,
    },
  };

  res.status(200).json(response);
};

export default updateSellerHandler;
