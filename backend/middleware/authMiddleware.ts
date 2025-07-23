import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

interface JwtPayloadWithUser extends jwt.JwtPayload {
  id: string;
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Invalid credentials bearer" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayloadWithUser;

    if (!decoded.id) {
      return res.status(401).json({ msg: "Invalid credentials verification" });
    }

    (req as any).user = decoded.id;

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};
