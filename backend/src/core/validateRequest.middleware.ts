import { NextFunction, Request, Response } from "express";
import * as validator from "express-validator";

const validateRequestMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validator.validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((e) => ({
        message: e.msg,
      })),
    });
  }

  next();
};

export { validateRequestMiddleware };
