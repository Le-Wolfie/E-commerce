import { Router } from "express";
import {
  adminRoutes,
  customerRoutes,
  sellerRoutes,
} from "./features/auth/auth.routes";
import { productRoutes } from "./features/product/product.routes";

export const adminRouter = () => {
  const router = Router();
  adminRoutes(router);
  return router;
};

export const customerRouter = () => {
  const router = Router();
  customerRoutes(router);
  return router;
};

export const sellerRouter = () => {
  const router = Router();
  sellerRoutes(router);
  return router;
};

export const productRouter = () => {
  const router = Router();
  productRoutes(router);
  return router;
};
