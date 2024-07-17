import { UserModel } from "features/auth/data/models/user.model";
import { validateRequestMiddleware } from "../../../../core/validateRequest.middleware";
import * as validator from "express-validator";

const validateEmailMiddleware = [
  validator
    .body("email")

    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid")
    .custom(async (email) => {
      const user = await UserModel.findOne({
        email,
      });

      if (user) {
        throw new Error("Email is already taken");
      }

      return true;
    }),

  validateRequestMiddleware,
];

export default validateEmailMiddleware;
