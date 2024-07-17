import { validateRequestMiddleware } from "../../../../core/validateRequest.middleware";
import * as validator from "express-validator";

const validateProcessReturnOrRefundMiddleware = [
  validator
    .body("returnReason")

    .exists()
    .withMessage("Reason is required")
    .isString()
    .withMessage("Reason must be a string"),

  validateRequestMiddleware,
];

export default validateProcessReturnOrRefundMiddleware;
