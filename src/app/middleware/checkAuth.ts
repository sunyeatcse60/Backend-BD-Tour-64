/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../ErrorHelper/Apperror";
import { verifyToken } from "../utils/jwt";



export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers.authorization; // Directly get the token (no split)

    if (!accessToken) {
      throw new AppError(403, "No Token Received");
    }

    const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET);

    if (!verifiedToken || typeof verifiedToken === "string") {
      throw new AppError(403, "You are not authorized");
    }

    if (!authRoles.includes(verifiedToken.role)) {
      throw new AppError(403, "You are not permitted to view this route");
    }

    (req as any).user = verifiedToken;
    next();

  } catch (error) {
    next(error);
  }
};
