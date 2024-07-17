import { Request, Response } from "express";
import { TokenPayload } from "../../../../core/checkRole.middleware";
import bcrypt from "bcrypt";
import { UserModel } from "../../data/models/user.model";
type HandlerRequest = Request<
  {},
  {},
  {
    oldPassword: string;
    newPassword: string;
    user: TokenPayload;
  }
>;

const updateUserPasswordHandler = async (req: HandlerRequest, res: Response) => {
  const { oldPassword, newPassword, user } = req.body;
  const userToUpdate = await UserModel.findOne({ _id: user.userId });

  if (!userToUpdate) {
    res.status(404).json({
      errors: [
        {
          message: "User not found",
        },
      ],
    });
    return;
  }

  const isPasswordMatch = await bcrypt.compare(
    oldPassword,
    userToUpdate.password
  );

  if (!isPasswordMatch) {
    res.status(401).json({ error: [{ message: "Invalid credentials" }] });
    return;
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  userToUpdate.password = hashedPassword;
  await userToUpdate.save();

  const response = {
    message: "Password updated successfully",
    user: {
      id: userToUpdate._id,
      email: userToUpdate.email,
      role: userToUpdate.role,
    },
  };

  res.status(200).json(response);
};

export default updateUserPasswordHandler;
