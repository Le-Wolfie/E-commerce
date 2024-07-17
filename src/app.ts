import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import express, { NextFunction, Request, Response } from "express";

import {
  adminRouter,
  cartRouter,
  checkoutRouter,
  customerRouter,
  orderRouter,
  productRouter,
  sellerRouter,
} from "./router";
import { isDev } from "./env";
import logger from "./core/logger";

// Create Express server
const app = express();

// Configure HTTP request logger middleware
app.use(
  morgan("combined", {
    stream: { write: (message) => logger.http(message) },
    skip: () => isDev,
  })
);

// Use helmet to secure HTTP headers
// https://expressjs.com/en/advanced/best-practice-security.html#use-helmet
app.use(helmet());

// Disable the `X-Powered-By` HTTP header for security
// https://expressjs.com/en/advanced/best-practice-security.html#reduce-fingerprinting
app.disable("x-powered-by");

// Use compression middleware to compress HTTP responses
// https://stackoverflow.com/a/58813283/14174934
app.use(compression());

// Enable CORS
// https://stackoverflow.com/a/61988727/14174934
app.use(cors());

// Parse JSON and url-encoded query
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount API routes
app.use("/admin", adminRouter());
app.use("/customer", customerRouter());
app.use("/seller", sellerRouter());
app.use("/product", productRouter());
app.use("/cart", cartRouter());
app.use("/checkout", checkoutRouter());
app.use("/order", orderRouter());

// TODO: Custom 404 handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    error: {
      message: "Not found",
    },
  });
});

// TODO: Custom error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.stack);
  res.status(500).json({ error: { message: "Something broke on our end" } });
});

export default app;
