/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserServices } from './user.service';
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsyne } from '../../utils/catchAsync';


// const createUserFunction = () => {
//     const user = await UserServices.createUserService(req.body);

//     res.status(httpStatus.CREATED).json({
//       message: "User created successfully",
//       user
//     });
// }


//new file acha ai code utils folder a
// type asyncHandlear = (req: Request, res: Response, next : NextFunction) => Promise<void>;

// const catchAsyne = (fn : asyncHandlear) => function (req: Request, res: Response, next: NextFunction) {
//   Promise.resolve(fn(req, res, next)).catch((error: any) => {
//     console.log(error);
//     next(error);
//   });
// }


const createUser = catchAsyne(async (req: Request, res: Response, next: NextFunction) => {
  const user = await UserServices.createUserService(req.body);

  res.status(httpStatus.CREATED).json({
    message: "User created successfully",
    user
  });
});

// const createUser = async (req: Request, res: Response, next : NextFunction) => {
//   try {

//     // throw new Error ("Fake error");
//     // throw new AppError(httpStatus.BAD_REQUEST,"fake error")

//     const user = await UserServices.createUserService(req.body);

//     // const { name, email } = req.body;
//     // const user = await User.create({
//     //   name, email
//     // });

//     res.status(httpStatus.CREATED).json({
//       message: "User created successfully",
//       user
//     });
//   } 


//   catch (error: any) {  
//     console.log(error);
//     next(error)


//     // res.status(httpStatus.BAD_REQUEST).json({
//     //   message: `something went rong ${(error as Error).message}`,
//     //   error
//     // });
//   }
// };




const getAllUsers = catchAsyne(async (req: Request, res: Response, next: NextFunction) => {
  const users = await UserServices.getAllUsers();

  res.status(httpStatus.OK).json({
    message: "Users retrieved successfully",
    users
  });
});


export const UserControllers = { createUser, getAllUsers };
