import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Role } from "../../../../../core/checkRole.middleware";
import { CustomerModel } from "../../../data/models/customer.model";

type HandlerRequest = Request<
  {},
  {},
  {
    email: string;
    address?: string;
    password: string;
  }
>;

const createCustomerHandler = async (req: HandlerRequest, res: Response) => {
  const { email, password, address } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const createdCustomer = await CustomerModel.create({
    email,
    address,
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
