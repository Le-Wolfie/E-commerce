import { NextFunction, Request, Response } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  const { message } = req.params;

  // Ensure example message is provided
  if (!message) {
    return res.status(400).json({ message: "Example message is required" });
  }

  // Ensure example message is a string
  if (typeof message !== "string") {
    return res
      .status(400)
      .json({ message: "Example message must be a string" });
  }

  next();
};
