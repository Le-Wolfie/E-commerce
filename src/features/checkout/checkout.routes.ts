import { Router } from "express";
import asyncHandler from "express-async-handler";
import createOrderHandler from "./logic/handlers/createOrder.handler";
import { checkRole, Role } from "../../core/checkRole.middleware";
import updateOrderStatusHandler from "./logic/handlers/updateOrderStatus.handler";
import getOrderHandler from "./logic/handlers/getOrder.handler";
import validateCreateOrderRequestBodyMiddleware from "./logic/middlewares/validateCreateOrderRequest.middleware";
import validateUpdateOrderStatusRequestBodyMiddleware from "./logic/middlewares/validateUpdateOrderStatus.middleware";
import ensureOrderIdInParamsMiddleware from "./logic/middlewares/ensureOrderIdInParams.middleware";

const checkoutRoutes = (router: Router) => {
  router.post(
    "/",
    checkRole([Role.CUSTOMER]),
    validateCreateOrderRequestBodyMiddleware,
    asyncHandler(createOrderHandler as any)
  );
  router.patch(
    "/:orderId",
    checkRole([Role.SELLER]),
    ensureOrderIdInParamsMiddleware,
    validateUpdateOrderStatusRequestBodyMiddleware,
    asyncHandler(updateOrderStatusHandler as any)
  );

  router.get(
    "/:orderId",
    ensureOrderIdInParamsMiddleware,
    asyncHandler(getOrderHandler as any)
  );
};
export { checkoutRoutes };
