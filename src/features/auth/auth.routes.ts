import { Router } from "express";

import asyncHandler from "express-async-handler";
import createAdminHandler from "./logic/handlers/admin/createAdmin.handler";
import deleteAdminHandler from "./logic/handlers/admin/deleteAdmin.handler";
import createCustomerHandler from "./logic/handlers/customer/createCustomer.handler";
import loginAdminHandler from "./logic/handlers/admin/loginAdmin.handler";
import { checkRole, Role } from "../../core/checkRole.middleware";
import deleteCustomerHandler from "./logic/handlers/customer/deleteCustomer.handler";
import updateCustomerHandler from "./logic/handlers/customer/updateCustomer.handler";
import loginCustomerHandler from "./logic/handlers/customer/loginCustomer.handler";
import createSellerHandler from "./logic/handlers/seller/createSeller.handler";
import updateSellerHandler from "./logic/handlers/seller/updateSeller.handler";
import loginSellerHandler from "./logic/handlers/seller/loginSeller.handler";
import deleteSellerHandler from "./logic/handlers/seller/deleteSeller.handler";
import validateEmailMiddleware from "./logic/middlewares/validateEmail.middleware";

const adminRoutes = (router: Router) => {
  router.post("/", validateEmailMiddleware, asyncHandler(createAdminHandler));
  router.post(
    "/login",

    asyncHandler(loginAdminHandler)
  );
  router.delete(
    "/",
    checkRole([Role.ADMIN]),
    asyncHandler(deleteAdminHandler as any)
  );
};

export { adminRoutes };

const customerRoutes = (router: Router) => {
  router.post(
    "/",
    validateEmailMiddleware,
    asyncHandler(createCustomerHandler)
  );
  router.patch(
    "/",
    checkRole([Role.CUSTOMER]),
    asyncHandler(updateCustomerHandler as any)
  );
  router.post(
    "/login",

    asyncHandler(loginCustomerHandler)
  );
  router.delete(
    "/",
    checkRole([Role.ADMIN]),
    asyncHandler(deleteCustomerHandler as any)
  );
};

export { customerRoutes };

const sellerRoutes = (router: Router) => {
  router.post("/", validateEmailMiddleware, asyncHandler(createSellerHandler));
  router.patch(
    "/",
    checkRole([Role.SELLER]),
    asyncHandler(updateSellerHandler as any)
  );
  router.post(
    "/login",

    asyncHandler(loginSellerHandler)
  );
  router.delete(
    "/",
    checkRole([Role.ADMIN]),
    asyncHandler(deleteSellerHandler as any)
  );
};

export { sellerRoutes };
