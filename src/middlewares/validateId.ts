import { type Request, type Response, type NextFunction } from "express";
import { Types } from "mongoose";

export function validateId(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID");
  }

  next();
}
