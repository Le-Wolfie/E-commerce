import mongoose from "mongoose";
import supertest from "supertest";

import app from "../src/app";
import * as database from "./database";
import { exampleModelName } from "../src/features/example/data/models/example.model";

const request = supertest(app);

describe("Example", () => {
  beforeAll(async () => {
    await database.connect();
  });

  beforeEach(async () => {
    await database.clear();
  });

  afterAll(async () => {
    await database.disconnect();
  });

  describe("POST /example/:message", () => {
    it("should return 200 OK", async () => {
      const response = await request.post("/example/Hello");

      expect(response.status).toBe(200);

      const findExampleResult = await mongoose
        .model(exampleModelName)
        .findOne({ message: "Hello" });

      expect(findExampleResult).not.toBeNull();
    });
  });
});
