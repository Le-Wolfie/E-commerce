import { Request, Response } from "express";

import ExampleModel from "../../data/models/example.model";

/**
 * An example handler that creates an example document in the database
 */
const handler = async (req: Request, res: Response) => {
  const example = await ExampleModel.create({ message: req.params.message });

  res.status(200).json({ example });
};

export default handler;
