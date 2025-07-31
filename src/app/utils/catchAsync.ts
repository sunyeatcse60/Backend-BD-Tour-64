/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { NextFunction, Request, Response } from "express";

// type asyncHandlear = (req: Request, res: Response, next: NextFunction) => Promise<void>;

// export const catchAsyne = (fn: asyncHandlear) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     Promise.resolve(fn(req, res, next)).
//     catch((error: any) => {
//       console.log(error);
//       next(error);
//     });
//   };
// };


import { NextFunction, Request, Response } from "express";



type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export const catchAsync = (fn: AsyncHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error: any) => {
    //  if(envVars.NODE_ENV !== "development"){
    //   console.log(error);
    //  }
      next(error);
    });
  };
};

