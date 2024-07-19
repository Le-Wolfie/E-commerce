import { orderStatusEnum } from "../../../checkout/data/models/order.model";
import { validateRequestMiddleware } from "../../../../core/validateRequest.middleware";
import * as validator from "express-validator";

const validateUpdateOrderStatusRequestBodyMiddleware = [
  validator
    .body("orderStatus")

    .exists()
    .withMessage("Order Status is required")
    .isIn(orderStatusEnum)
    .withMessage("Order Status is invalid"),

  validateRequestMiddleware,
];

export default validateUpdateOrderStatusRequestBodyMiddleware;
