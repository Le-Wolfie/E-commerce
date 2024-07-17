export const env = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  LOGS_PATH: process.env.LOGS_PATH,
  MONGO_URI: process.env.MONGO_URI,
};

export const isDev = env.NODE_ENV === "development";

export const validateEnvironmentVariables = () => {
  Object.entries(env).forEach(([key, value]) => {
    if (!value) {
      // Warn the user that the environment variable is not set
      console.warn(`Environment variable ${key} is not set!`);
    }
  });
};

export default env;
