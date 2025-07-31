/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-unused-vars */
// import httpStatus  from 'http-status-codes';
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { NextFunction, Request, Response } from "express";
// import { catchAsyne } from "../../utils/catchAsync"
// import { AuthServices } from './auth.service';


// const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

// const loginInfo = await AuthServices.credentialsLogin(req.body)

//   res.status(httpStatus.OK).json({
//     message: "User login successfully",
//     loginInfo
//   });
// });


// export const AuthControllers = {credentialsLogin}





import httpStatus from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import { setAuthCookie } from "../../utils/setCookie";
import { text } from "stream/consumers";
import { sendResponse } from "../../utils/sendResponse";
import AppError from "../../ErrorHelper/Apperror";
import { JwtPayload } from "jsonwebtoken";
import { createUserTokens } from "../../utils/userToken";
import { envVars } from "../../config/env";
import passport, { use } from "passport";
import { error } from "console";

const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // const loginInfo = await AuthServices.credentialsLogin(req.body);

  passport.authenticate("local", async (error: any, user: any, info: any) => {

  if (error) {
    return next(new AppError(401, error))
  }

  if(!user){
   return next(new AppError(401, info.message))
  }

  const userTokens = await createUserTokens(user);
  // delete user.toObject().password;

  const { password: pass, ...rest } = user.toObject();



  setAuthCookie(res, userTokens);

  res.status(httpStatus.OK).json({
    success : true,
    message: "User logged in successfully",
    data : {
      accrssToken : userTokens.accessToken,
      refreshToken : userTokens.refreshToken,
      user : rest
    }
  });
})(req, res, next)

// res.cookie("accessToken", loginInfo.accessToken, {
//   httpOnly : true,
//   secure : false
// })

// setAuthCookie(res, loginInfo);

// // cookie set hobe automatically

// // res.cookie("refreshToken", loginInfo.refreshToken,{
// //   httpOnly : true,
// //   secure : false
// // })

// res.status(httpStatus.OK).json({
//   message: "User logged in successfully",
//   loginInfo,
// });
});



// new access token
const getNewAccessToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.refreshToken;
  const tokenInfo = await AuthServices.getNewAccessToken(refreshToken);

  res.cookie("accessToken", tokenInfo.newAccessToken, {
    httpOnly: true,
    secure: false
  })
  // setAuthCookie(res,tokenInfo)


  res.status(httpStatus.OK).json({
    message: "New acces token generate successfully",
    tokenInfo,
  });
});


// logOut code
const logOut = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  })

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  })


  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logout successfully",
    data: null
  });

});


// resetpassword
const resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  const decodedToken = req.user as JwtPayload;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  if (!oldPassword || !newPassword) {
    throw new AppError(httpStatus.BAD_REQUEST, "Old or new password is missing");
  }

  await AuthServices.resetPassword(oldPassword, newPassword, decodedToken);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Password changed successfully",
    data: null
  });
});



// googleCallbackController

const googleCallbackController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  let redirectTo = req.query.state ? req.query.state as string : "";

  if (redirectTo.startsWith("/")) {
    redirectTo = redirectTo.slice(1)
  }

  const user = req.user;
  console.log("User:", user);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const tokenInfo = createUserTokens(user);
  setAuthCookie(res, tokenInfo);


  res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`);

});





export const AuthControllers = {
  credentialsLogin, getNewAccessToken,
  logOut, resetPassword, googleCallbackController
};
