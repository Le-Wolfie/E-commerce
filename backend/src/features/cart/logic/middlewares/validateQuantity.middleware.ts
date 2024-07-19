import { validateRequestMiddleware } from "../../../../core/validateRequest.middleware";
import * as validator from "express-validator";

const validateQuantityMiddleware = [
  validator
    .body("quantity")

    .exists()
    .withMessage("Quantity is required")
    .isNumeric()
    .withMessage("Quantity is invalid"),

  validateRequestMiddleware,
];

export default validateQuantityMiddleware;
