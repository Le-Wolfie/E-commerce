import { Request, Response } from "express";
import { AdminModel } from "../../../data/models/admin.model";

type HandlerRequest = Request<
  {},
  {},
  {
    email: string;
  }
>;

const deleteAdminHandler = async (req: HandlerRequest, res: Response) => {
  const { email } = req.body;
  const adminToDelete = await AdminModel.findOneAndDelete({
    email: email,
  });
  if (!adminToDelete) {
    res.status(404).json({
      errors: [
        {
          message: "Admin not found",
        },
      ],
    });
    return;
  }

  const response = {
    message: "Admin deleted successfully",
    admin: {
      id: adminToDelete._id,
      email: adminToDelete.email,
      role: adminToDelete.role,
    },
  };

  res.status(200).json(response);
};

export default deleteAdminHandler;
