import { Router } from "express";
import paginate from "express-paginate";
import asyncHandler from "express-async-handler";
import createProductHandler from "./logic/handlers/createProduct.handler";
import { checkRole, Role } from "../../core/checkRole.middleware";
import updateProductHandler from "./logic/handlers/updateProduct.handler";
import deleteProductHandler from "./logic/handlers/deleteProduct.handler";
import getProductByCodeHandler from "./logic/handlers/getProductByCode.handler";
import ensureProductCodeInParamsMiddleware from "./logic/middlewares/ensureProductCodeInParams.middleware";
import getAllProductsHandler from "./logic/handlers/getAllProducts.handler";
import validateCreateProductRequestBodyMiddleware from "./logic/middlewares/validateCreateProductRequest.middleware";
import validateUpdateProductRequestBodyMiddleware from "./logic/middlewares/validateUpdateProductRequest.middleware";

const productRoutes = (router: Router) => {
  router.post(
    "/",
    checkRole([Role.ADMIN]),
    validateCreateProductRequestBodyMiddleware,
    asyncHandler(createProductHandler as any)
  );
  router.patch(
    "/:code",
    checkRole([Role.ADMIN]),
    ensureProductCodeInParamsMiddleware,
    validateUpdateProductRequestBodyMiddleware,
    asyncHandler(updateProductHandler as any)
  );
  router.delete(
    "/",
    checkRole([Role.ADMIN]),
    asyncHandler(deleteProductHandler as any)
  );

  router.get(
    "/:code",
    ensureProductCodeInParamsMiddleware,
    asyncHandler(getProductByCodeHandler as any)
  );

  router.get(
    "/",
    paginate.middleware(),
    asyncHandler(getAllProductsHandler as any)
  );
};

export { productRoutes };
