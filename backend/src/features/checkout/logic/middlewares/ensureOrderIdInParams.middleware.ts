import { validateRequestMiddleware } from "../../../../core/validateRequest.middleware";
import * as validator from "express-validator";

const ensureOrderIdInParamsMiddleware = [
  validator
    .param("orderId")

    .exists()
    .withMessage("Order ID is required")
    .isString()
    .withMessage("Order ID is invalid"),

  validateRequestMiddleware,
];

export default ensureOrderIdInParamsMiddleware;
