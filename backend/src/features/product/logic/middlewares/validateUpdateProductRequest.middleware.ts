import { validateRequestMiddleware } from "../../../../core/validateRequest.middleware";
import * as validator from "express-validator";

const validateUpdateProductRequestBodyMiddleware = [
  validator
    .body("name")

    .optional()
    .isString()
    .withMessage("Name is invalid"),

  validator
    .body("description")

    .optional()
    .isString()
    .withMessage("Description is invalid"),

  validator
    .body("price")

    .optional()
    .isNumeric()
    .withMessage("Price is invalid"),

  validator
    .body("category")

    .optional()
    .isString()
    .withMessage("Category is invalid"),

  validator
    .body("stock")

    .optional()
    .isNumeric()
    .withMessage("Stock is invalid"),

  validateRequestMiddleware,
];

export default validateUpdateProductRequestBodyMiddleware;
