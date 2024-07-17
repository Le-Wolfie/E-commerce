import mongoose, { Schema } from "mongoose";

import ExampleType from "../types/example.type";

export const exampleSchema: Schema = new Schema<ExampleType>({
  message: { type: String, required: true },
});

export const exampleModelName = "Example";

const ExampleModel = mongoose.model<ExampleType>(
  exampleModelName,
  exampleSchema
);

export default ExampleModel;
