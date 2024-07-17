import { InferSchemaType } from "mongoose";

import { exampleSchema } from "../models/example.model";

type ExampleType = InferSchemaType<typeof exampleSchema>;

export default ExampleType;
