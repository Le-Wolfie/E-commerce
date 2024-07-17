import { Router } from "express";

import exampleRoutes from "./features/example/example.routes";

const router: Router = Router();

export default (): Router => {
  exampleRoutes(router);

  return router;
};
