import { checkRole, Role } from "../../core/checkRole.middleware";
import { Router } from "express";
import paginate from "express-paginate";
import asyncHandler from "express-async-handler";
import getAuthenticatedUserOrdersHandler from "./logic/handlers/getUserOrders.handler";
import trackOrderStatusHandler from "./logic/handlers/trackOrderStatus.handler";
import processReturnOrRefundHandler from "./logic/handlers/processReturnOrRefund.handler";
import ensureOrderIdInParamsMiddleware from "../checkout/logic/middlewares/ensureOrderIdInParams.middleware";
import validateProcessReturnOrRefundMiddleware from "./logic/middlewares/validateProcessReturnOrRefund.middleware";

const orderRoutes = (router: Router) => {
  router.get(
    "/",
    checkRole([Role.CUSTOMER]),
    paginate.middleware(),
    asyncHandler(getAuthenticatedUserOrdersHandler as any)
  );

  router.get(
    "/:orderId",
    checkRole([Role.CUSTOMER]),
    ensureOrderIdInParamsMiddleware,
    asyncHandler(trackOrderStatusHandler as any)
  );

  router.patch(
    "/:orderId",
    checkRole([Role.ADMIN, Role.SELLER]),
    ensureOrderIdInParamsMiddleware,
    validateProcessReturnOrRefundMiddleware,
    asyncHandler(processReturnOrRefundHandler as any)
  );
};
export { orderRoutes };
