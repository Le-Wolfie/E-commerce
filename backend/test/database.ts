import mongoose from "mongoose";

import { MongoMemoryServer } from "mongodb-memory-server";

const mongoMemoryServer = MongoMemoryServer.create();

export const connect = async () => {
  const uri = (await mongoMemoryServer).getUri();
  await mongoose.connect(uri);
};

export const disconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await (await mongoMemoryServer).stop();
};

export const clear = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};
