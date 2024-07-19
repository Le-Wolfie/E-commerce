import { Request, Response } from "express";
import { CustomerModel } from "../../../../../features/auth/data/models/customer.model";

type HandlerRequest = Request<
  {},
  {},
  {
    email: string;
  }
>;

const deleteCustomerHandler = async (req: HandlerRequest, res: Response) => {
  const { email } = req.body;
  const customerToDelete = await CustomerModel.findOneAndDelete({
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
