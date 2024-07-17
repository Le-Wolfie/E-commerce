import { Request, Response } from "express";
import { UserModel } from "../../../data/models/user.model";
import { TokenPayload } from "../../../../../core/checkRole.middleware";

type HandlerRequest = Request<
  {},
  {},
  {
    email?: string;
    user: TokenPayload;
  }
>;

const updateCustomerHandler = async (req: HandlerRequest, res: Response) => {
  const { email, user } = req.body;
  const customerToUpdate = await UserModel.findOneAndUpdate(
    { _id: user.userId },
    { ...(email && { email }) },
    { new: true }
  );

  if (!customerToUpdate) {
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
    message: "Customer updated successfully",
    customer: {
      id: customerToUpdate._id,
      email: customerToUpdate.email,
      role: customerToUpdate.role,
    },
  };

  res.status(200).json(response);
};

export default updateCustomerHandler;
