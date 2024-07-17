import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { Role } from "../../../../../core/checkRole.middleware";
import { AdminModel } from "../../../data/models/admin.model";

type HandlerRequest = Request<
  {},
  {},
  {
    email: string;
    password: string;
  }
>;

const loginAdminHandler = async (req: HandlerRequest, res: Response) => {
  const { email, password } = req.body;

  const admin = await AdminModel.findOne({ email });

  if (!admin) {
    res.status(401).json({ errors: [{ message: "Invalid credentials" }] });
    return;
  }

  const isPasswordMatch = await bcrypt.compare(password, admin.password);

  if (!isPasswordMatch) {
    res.status(401).json({ error: [{ message: "Invalid credentials" }] });
    return;
  }

  // Generate JWT token with user's id and role
  const token = jwt.sign(
    {
      userId: admin._id.toString(),
      role: Role.ADMIN,
    },
    process.env.JWT_SECRET as string
  );

  res.status(200).json({ token });
};

export default loginAdminHandler;
