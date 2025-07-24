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

const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const loginInfo = await AuthServices.credentialsLogin(req.body);

  res.status(httpStatus.OK).json({
    message: "User logged in successfully",
    loginInfo,
  });
});

export const AuthControllers = { credentialsLogin };
