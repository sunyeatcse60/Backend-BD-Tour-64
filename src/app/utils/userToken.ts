import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import { IsActive, iUser } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import { generateToken, verifyToken } from "./jwt";
import AppError from "../ErrorHelper/Apperror";
import { StatusCodes } from "http-status-codes";

export const createUserTokens = (user: Partial<iUser>) => {
    const jwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role,
    };

    const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRE);
    //  refresh token ar kaj    
    const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRES);

    return {
        accessToken,
        refreshToken
    }
}



export const createNewAccessTokenWithRefreshToken = async (refreshToken: string) => {

    const verifiedRefreshToken = verifyToken(refreshToken, envVars.JWT_REFRESH_SECRET) as JwtPayload;

    const isUserExist = await User.findOne({ email: verifiedRefreshToken.email });

    if (!isUserExist) {
        throw new AppError(StatusCodes.BAD_REQUEST, "User does not exist");
    }

    if (isUserExist.isActive === IsActive.Disable || isUserExist.isActive === IsActive.InActive) {
        throw new AppError(StatusCodes.BAD_REQUEST, "User is blocked");
    }

    if (isUserExist.isDeleted) {
        throw new AppError(StatusCodes.BAD_REQUEST, "User is deleted");
    }

    const jwtPayload = {
        userId: isUserExist.id,
        email: isUserExist.email,
        role: isUserExist.role,
    };

    const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRE);

    return {
        accessToken
    };
}