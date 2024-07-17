import { Router } from "express";

import { asyncHandler } from "@fcai-sis/shared-utilities";
import exampleHandler from "./logic/handlers/example.handler";
import validateExampleMessageMiddleware from "./logic/middlewares/validateExampleMessage.middleware";

export default (router: Router) => {
  router.post(
    "/example/:message",

    // Validate example message
    validateExampleMessageMiddleware,

    // Handle example request
    asyncHandler(exampleHandler)
  );
};
