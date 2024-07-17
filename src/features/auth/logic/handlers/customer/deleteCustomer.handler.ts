import { Request, Response } from "express";
import { UserModel } from "../../../../../features/auth/data/models/user.model";

type HandlerRequest = Request<
  {},
  {},
  {
    email: string;
  }
>;

const deleteCustomerHandler = async (req: HandlerRequest, res: Response) => {
  const { email } = req.body;
  const customerToDelete = await UserModel.findOneAndDelete({
    email: email,
  });
  if (!customerToDelete) {
    res.status(404).json({
      errors: [
        {
          message: "Customer not found",
        },
      ],
    });
    return;
  }

  const response = {
    message: "Customer deleted successfully",
    customer: {
      id: customerToDelete._id,
      email: customerToDelete.email,
      role: customerToDelete.role,
    },
  };

  res.status(200).json(response);
};

export default deleteCustomerHandler;
