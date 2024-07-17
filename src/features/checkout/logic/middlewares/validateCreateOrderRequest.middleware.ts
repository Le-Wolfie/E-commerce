import {
  orderStatusEnum,
  paymentStatusEnum,
} from "../../../checkout/data/models/order.model";
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
    .withMessage("Product is required")
    .isMongoId()
    .withMessage("Product is invalid"),

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
    .body("shippingAddress")

    .exists()
    .withMessage("Shipping Address is required")
    .isString()
    .withMessage("Shipping Address is invalid"),

  validator
    .body("paymentStatus")

    .exists()
    .withMessage("Payment Status is required")
    .isIn(paymentStatusEnum)
    .withMessage("Payment Status is invalid"),

  validator
    .body("totalPrice")

    .exists()
    .withMessage("Total Price is required")
    .isNumeric()
    .withMessage("Total Price is invalid"),

  validator
    .body("orderStatus")

    .exists()
    .withMessage("Order Status is required")
    .isIn(orderStatusEnum)
    .withMessage("Order Status is invalid"),

  validateRequestMiddleware,
];

export default validateCreateOrderRequestBodyMiddleware;
