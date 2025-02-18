import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { Role } from "../../../../../core/checkRole.middleware";
import { SellerModel } from "../../../data/models/seller.model";

type HandlerRequest = Request<
  {},
  {},
  {
    email: string;
    password: string;
  }
>;

const loginSellerHandler = async (req: HandlerRequest, res: Response) => {
  const { email, password } = req.body;

  const seller = await SellerModel.findOne({ email });

  if (!seller) {
    res.status(401).json({ errors: [{ message: "Invalid credentials" }] });
    return;
  }

  const isPasswordMatch = await bcrypt.compare(password, seller.password);

  if (!isPasswordMatch) {
    res.status(401).json({ error: [{ message: "Invalid credentials" }] });
    return;
  }

  // Generate JWT token with user's id and role
  const token = jwt.sign(
    {
      userId: seller._id.toString(),
      role: Role.SELLER,
    },
    process.env.JWT_SECRET as string
  );

  res.status(200).json({ token });
};

export default loginSellerHandler;
