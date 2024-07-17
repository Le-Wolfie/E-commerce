import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../../../data/models/user.model";
import { Role } from "../../../../../core/checkRole.middleware";

type HandlerRequest = Request<
  {},
  {},
  {
    email: string;
    password: string;
  }
>;

const createCustomerHandler = async (req: HandlerRequest, res: Response) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const createdCustomer = await UserModel.create({
    email,
    password: hashedPassword,
    role: Role.CUSTOMER,
  });

  const response = {
    message: "Customer created successfully",
    customer: {
      id: createdCustomer._id,
      email: createdCustomer.email,
      role: createdCustomer.role,
    },
  };

  res.status(201).json(response);
};

export default createCustomerHandler;
