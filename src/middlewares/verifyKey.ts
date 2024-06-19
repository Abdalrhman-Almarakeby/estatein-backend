import { Request, Response, NextFunction } from "express";

export function verifyAPIKey(req: Request, res: Response, next: NextFunction) {
  const providedKey = req.headers["x-api-key"] as string;

  if (!providedKey || providedKey !== process.env.API_SECRET_KEY) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
}
