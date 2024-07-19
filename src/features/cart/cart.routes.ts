import { Router } from "express";
import asyncHandler from "express-async-handler";
import addItemToCartHandler from "./logic/handlers/addItemToCart.handler";
import { checkRole, Role } from "../../core/checkRole.middleware";
import removeItemFromCartHandler from "./logic/handlers/removeItemFromCart.handler";
import updateCartItemQuantityHandler from "./logic/handlers/updateCartItemQuantity.handler";
import getCartHandler from "./logic/handlers/getCart.handler";
import validateAddItemToCartMiddleware from "./logic/middlewares/validateAddItemToCart.middleware";
import validateQuantityMiddleware from "./logic/middlewares/validateQuantity.middleware";

const cartRoutes = (router: Router) => {
  router.post(
    "/add",
    checkRole([Role.CUSTOMER]),
    validateAddItemToCartMiddleware,
    asyncHandler(addItemToCartHandler as any)
  );
  router.patch(
    "/remove/:itemId",
    checkRole([Role.CUSTOMER]),
    asyncHandler(removeItemFromCartHandler as any)
  );
  router.patch(
    "/:itemId",
    checkRole([Role.CUSTOMER]),
    validateQuantityMiddleware,
    asyncHandler(updateCartItemQuantityHandler as any)
  );
  router.get(
    "/",
    checkRole([Role.CUSTOMER]),
    asyncHandler(getCartHandler as any)
  );
};
export { cartRoutes };
