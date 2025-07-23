/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { NextFunction, Request, Response } from "express"
// import { envVars } from "../config/env"
// import AppError from "../ErrorHelper/Apperror";

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const globalErrorHandelar = (error: any, req: Request, res : Response, next : NextFunction) => {

//     let statusCode = 500;
//     let message = `Something went rong ${error.message} from global error!!`;



//     if(error instanceof AppError){
//         statusCode = error.statusCode
//         message = error.message
//     }
//     else if(error instanceof Error){
//         statusCode = 500
//         message = error.message
//     }



//     res.status(statusCode).json({
//         success : false,
//         message,
//         error,
//         stack : envVars.NODE_ENV === "development" ? error.stack : null
//     })
// }






import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../ErrorHelper/Apperror";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let message = `Something went wrong: ${error.message}`;

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (error instanceof Error) {
    statusCode = 500;
    message = error.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    error,
    stack: envVars.NODE_ENV === "development" ? error.stack : null,
  });
};
