import { Router } from "express";
import asyncHandler from "express-async-handler";
import { checkRole, Role } from "../../core/checkRole.middleware";
import getTotalUsersHandler from "./logic/handlers/getTotalUsers.handler";
import paginate from "express-paginate";
import getOrderDataHandler from "./logic/handlers/getOrderData.handler";
import getMostPopularProductsHandler from "./logic/handlers/getMostPopularProducts.handler";
import getNewestProductsHandler from "./logic/handlers/getNewestProducts.handler";

export const statsRoutes = (router: Router) => {
  router.get(
    "/total-users",
    checkRole([Role.ADMIN]),
    asyncHandler(getTotalUsersHandler as any)
  );
  router.get(
    "/orders-data",
    checkRole([Role.ADMIN]),
    paginate.middleware(),
    asyncHandler(getOrderDataHandler as any)
  );
  router.get(
    "/most-popular",
    asyncHandler(getMostPopularProductsHandler as any)
  );
  router.get(
    "/newest-products",
    paginate.middleware(),
    asyncHandler(getNewestProductsHandler as any)
  );
};
