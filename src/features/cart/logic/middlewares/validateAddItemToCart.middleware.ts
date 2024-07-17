import { validateRequestMiddleware } from "../../../../core/validateRequest.middleware";
import * as validator from "express-validator";

const validateAddItemToCartMiddleware = [
  validator
    .body("quantity")

    .exists()
    .withMessage("Quantity is required")
    .isNumeric()
    .withMessage("Quantity is invalid"),

  validator
    .body("price")

    .exists()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price is invalid"),

  validateRequestMiddleware,
];

export default validateAddItemToCartMiddleware;
