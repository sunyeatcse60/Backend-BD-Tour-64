/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { UserServices } from './user.service';
// import { NextFunction, Request, Response } from "express";
// import httpStatus from "http-status-codes";
// import { catchAsyne } from '../../utils/catchAsync';
// import { sendResponse } from '../../utils/sendResponse';


// // const createUserFunction = () => {
// //     const user = await UserServices.createUserService(req.body);

// //     res.status(httpStatus.CREATED).json({
// //       message: "User created successfully",
// //       user
// //     });
// // }


// //new file acha ai code utils folder a
// // type asyncHandlear = (req: Request, res: Response, next : NextFunction) => Promise<void>;

// // const catchAsyne = (fn : asyncHandlear) => function (req: Request, res: Response, next: NextFunction) {
// //   Promise.resolve(fn(req, res, next)).catch((error: any) => {
// //     console.log(error);
// //     next(error);
// //   });
// // }


// const createUser = catchAsyne(async (req: Request, res: Response, next: NextFunction) => {
//   const data = await UserServices.createUserService(req.body);

//   sendResponse(res, {
//     success : true,
//     statusCode : httpStatus.CREATED,
//     message : "User created Successfuly",
//     data: data
//   })

//   // res.status(httpStatus.CREATED).json({
//   //   message: "User created successfully",
//   //   user
//   // });
// });

// // const createUser = async (req: Request, res: Response, next : NextFunction) => {
// //   try {

// //     // throw new Error ("Fake error");
// //     // throw new AppError(httpStatus.BAD_REQUEST,"fake error")

// //     const user = await UserServices.createUserService(req.body);

// //     // const { name, email } = req.body;
// //     // const user = await User.create({
// //     //   name, email
// //     // });

// //     res.status(httpStatus.CREATED).json({
// //       message: "User created successfully",
// //       user
// //     });
// //   } 


// //   catch (error: any) {  
// //     console.log(error);
// //     next(error)


// //     // res.status(httpStatus.BAD_REQUEST).json({
// //     //   message: `something went rong ${(error as Error).message}`,
// //     //   error
// //     // });
// //   }
// // };




// const getAllUsers = catchAsyne(async (req: Request, res: Response, next: NextFunction) => {
//   const result = await UserServices.getAllUsers();

//   // res.status(httpStatus.OK).json({
//   //   message: "Users retrieved successfully",
//   //   users

//   sendResponse(res, {
//     success : true,
//     statusCode : httpStatus.CREATED,
//     message : "All user retrived Successfuly",
//     data: result.data,
//     meta : result.meta,
//   })
    
//   });


// export const UserControllers = { createUser, getAllUsers };







import { UserServices } from "./user.service";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await UserServices.createUserService(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User created successfully",
    data,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await UserServices.getAllUsers();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All users retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

export const UserControllers = { createUser, getAllUsers };
