import { ProductModel } from "../../../product/data/models/product.model";
import { validateRequestMiddleware } from "../../../../core/validateRequest.middleware";
import * as validator from "express-validator";

const validateCreateProductRequestBodyMiddleware = [
  validator
    .body("code")

    .exists()
    .withMessage("Code is required")
    .isString()
    .withMessage("Code is invalid")
    .custom(async (code) => {
      const product = await ProductModel.findOne({
        code,
      });

      if (product) {
        throw new Error("Product already exists");
      }

      return true;
    }),

  validator
    .body("name")

    .exists()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name is invalid"),

  validator
    .body("description")

    .exists()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description is invalid"),

  validator
    .body("price")

    .exists()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price is invalid"),

  validator
    .body("category")

    .exists()
    .withMessage("Category is required")
    .isString()
    .withMessage("Category is invalid"),

  validator
    .body("stock")

    .exists()
    .withMessage("Stock is required")
    .isNumeric()
    .withMessage("Stock is invalid"),

  validateRequestMiddleware,
];

export default validateCreateProductRequestBodyMiddleware;
