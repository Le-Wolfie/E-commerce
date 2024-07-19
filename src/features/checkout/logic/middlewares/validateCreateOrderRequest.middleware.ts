import { validateRequestMiddleware } from "../../../../core/validateRequest.middleware";
import * as validator from "express-validator";

const validateCreateOrderRequestBodyMiddleware = [
  validator
    .body("items")

    .exists()
    .withMessage("Items are required")
    .isArray()
    .withMessage("Items should be an array"),

  validator
    .body("items.*.product")

    .exists()
    .withMessage("Product is required"),

  validator
    .body("items.*.quantity")

    .exists()
    .withMessage("Quantity is required")
    .isNumeric()
    .withMessage("Quantity is invalid"),

  validator
    .body("items.*.price")

    .exists()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price is invalid"),

  validator
    .body("totalPrice")

    .exists()
    .withMessage("Total Price is required")
    .isNumeric()
    .withMessage("Total Price is invalid"),

  validateRequestMiddleware,
];

export default validateCreateOrderRequestBodyMiddleware;
