import { type Request, type Response, type NextFunction } from "express";
import { isValidObjectId} from "mongoose";

export function validateId(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).send("Invalid object ID");
  }




  next();
}
