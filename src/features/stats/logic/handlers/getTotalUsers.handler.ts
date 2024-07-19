import { Request, Response } from "express";
import { UserModel } from "../../../auth/data/models/user.model";

type HandlerRequest = Request<{}, {}, {}>;

const getTotalUsersHandler = async (req: HandlerRequest, res: Response) => {
  const users = await UserModel.countDocuments();

  const response = {
    totalUsers: users,
  };

  res.status(200).json(response);
};

export default getTotalUsersHandler;
