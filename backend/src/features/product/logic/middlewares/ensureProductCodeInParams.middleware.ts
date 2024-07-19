import { validateRequestMiddleware } from "../../../../core/validateRequest.middleware";
import * as validator from "express-validator";

const ensureProductCodeInParamsMiddleware = [
  validator
    .param("code")

    .exists()
    .withMessage("Code is required")
    .isString()
    .withMessage("Code is invalid"),

  validateRequestMiddleware,
];

export default ensureProductCodeInParamsMiddleware;
