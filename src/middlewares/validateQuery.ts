import { type Request, type Response, type NextFunction } from "express";

export function validateQuery(req: Request, res: Response, next: NextFunction) {
  const { limit } = req.query;

  // if there is a limit but it is not a number
  if (limit && isNaN(Number(limit))) return res.status(400).send("Limit must be a number");

  next();
}
