import type { Request, Response, NextFunction } from "express";
import type { CustomError } from "../errors/CustomError";

export const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(typeof err);

  res.status(err?.statusCode ?? 500).json({
    msg: err.message,
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
};
