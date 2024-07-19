import app from "./app";
import database from "./database";
import logger from "./core/logger";
import env, { validateEnvironmentVariables } from "./env";

// Ensure that all required environment variables are present
validateEnvironmentVariables();

// Connect to MongoDB
database()
  .then(() => {
    // Start Express server
    app.listen(env.PORT, () => {
      logger.info(`Server is listening on port ${env.PORT}`);
    });
  })
  .catch((err) => {
    logger.error(err);
  });
