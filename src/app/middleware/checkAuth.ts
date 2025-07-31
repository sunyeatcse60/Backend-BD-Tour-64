import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../ErrorHelper/Apperror";
import { verifyToken } from "../utils/jwt";
import { StatusCodes } from "http-status-codes";
import { IsActive } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import { JwtPayload } from "jsonwebtoken";



export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers.authorization; // Directly get the token (no split)

    if (!accessToken) {
      throw new AppError(403, "No Token Received");
    }

    const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload;
    

    const isUserExist = await User.findOne({ email: verifiedToken.email });

    if (!isUserExist) {
      throw new AppError(StatusCodes.BAD_REQUEST, "User does not exist");
    }

    if (isUserExist.isActive === IsActive.Disable || isUserExist.isActive === IsActive.InActive) {
      throw new AppError(StatusCodes.BAD_REQUEST, "User is blocked");
    }

    if (isUserExist.isDeleted) {
      throw new AppError(StatusCodes.BAD_REQUEST, "User is deleted");
    }



    if (!verifiedToken || typeof verifiedToken === "string") {
      throw new AppError(403, "You are not authorized");
    }

    if (!authRoles.includes(verifiedToken.role)) {
      throw new AppError(403, "You are not permitted to view this route");
    }

    req.user = verifiedToken;
    next();

  } catch (error) {
    next(error);
  }
};
