import { Config } from "jest";
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/**/*.test.ts"],
  verbose: true,
  forceExit: false,
  setupFiles: ["<rootDir>/test/setup.ts"],
} as Config;
