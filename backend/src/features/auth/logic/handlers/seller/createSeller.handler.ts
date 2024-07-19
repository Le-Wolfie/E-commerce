import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Role } from "../../../../../core/checkRole.middleware";
import { SellerModel } from "../../../data/models/seller.model";

type HandlerRequest = Request<
  {},
  {},
  {
    email: string;
    storeName: string;
    password: string;
  }
>;

const createSellerHandler = async (req: HandlerRequest, res: Response) => {
  const { email, password, storeName } = req.body;

  if (!storeName) {
    res.status(400).json({ errors: [{ message: "Store name is required" }] });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const createdSeller = await SellerModel.create({
    email,
    password: hashedPassword,
    role: Role.SELLER,
    storeName,
  });

  const response = {
    message: "Seller created successfully",
    seller: {
      id: createdSeller._id,
      email: createdSeller.email,
      role: createdSeller.role,
      storeName: createdSeller.storeName,
    },
  };

  res.status(201).json(response);
};

export default createSellerHandler;
