import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { Role } from "../../../../../core/checkRole.middleware";
import { UserModel } from "../../../../../features/auth/data/models/user.model";

type HandlerRequest = Request<
  {},
  {},
  {
    email: string;
    password: string;
  }
>;

const loginCustomerHandler = async (req: HandlerRequest, res: Response) => {
  const { email, password } = req.body;

  const customer = await UserModel.findOne({ email });

  if (!customer) {
    res.status(401).json({ errors: [{ message: "Invalid credentials" }] });
    return;
  }

  const isPasswordMatch = await bcrypt.compare(password, customer.password);

  if (!isPasswordMatch) {
    res.status(401).json({ error: [{ message: "Invalid credentials" }] });
    return;
  }

  // Generate JWT token with user's id and role
  const token = jwt.sign(
    {
      userId: customer._id.toString(),
      role: Role.CUSTOMER,
    },
    process.env.JWT_SECRET as string
  );

  res.status(200).json({ token });
};

export default loginCustomerHandler;
