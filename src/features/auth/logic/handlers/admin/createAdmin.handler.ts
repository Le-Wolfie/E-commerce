import { Request, Response } from "express";
import { AdminModel } from "../../../data/models/admin.model";
import bcrypt from "bcrypt";
import { Role } from "../../../../../core/checkRole.middleware";

type HandlerRequest = Request<
  {},
  {},
  {
    email: string;
    password: string;
  }
>;

const createAdminHandler = async (req: HandlerRequest, res: Response) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const createdAdmin = await AdminModel.create({
    email,
    password: hashedPassword,
    role: Role.ADMIN,
  });

  const response = {
    message: "Admin created successfully",
    admin: {
      id: createdAdmin._id,
      email: createdAdmin.email,
      role: createdAdmin.role,
    },
  };

  res.status(201).json(response);
};

export default createAdminHandler;
