
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { NextFunction, Request, Response } from "express"
// import { envVars } from "../config/env"
// import AppError from "../ErrorHelper/Apperror";

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const globalErrorHandelar = (error: any, req: Request, res : Response, next : NextFunction) => {

//     let statusCode = 500;
//     let message = `Something went wrong ${error.message} from global error!!`;



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
import mongoose from "mongoose";
import { handleDuplicteError } from "../helpers/handelDuplicateError";
import { handleCastError } from "../helpers/handelCastError";
import { handelZodError } from "../helpers/handelZodError";
import { handelValidationError } from "../helpers/handelValidationError";


export const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  if(envVars.NODE_ENV === "development"){
    console.log(error);
  }

  let statusCode = 500;
  let message = `Something went wrong: ${error.message}`;
  let errorSouces: any = [
    // {
    // path: "isDeleted",
    // message: "Cast failes"}
  ];




  // mongoose duplicate error
  if (error.code === 11000) {
    const simplifiedError = handleDuplicteError(error);
    statusCode = simplifiedError.StatusCode;
    message = simplifiedError.message;
    // console.log("Dublicate error", error.message);
    // const dublicte = error.message.match(/"([^"]*)"/)
    // statusCode = 400;
    // message = `${dublicte[1]} already exit`
  }


  // mongoose Cast error
  else if (error.name === "CastError") {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.StatusCode;
    message = simplifiedError.message;
    // statusCode = 400;
    // message = "Invalid mongose Object id. Please provide a valid id"
  }

  // Zod error
  else if (error.name === "ZodError") {
    const simplifiedError = handelZodError(error);
    statusCode = simplifiedError.StatusCode;
    message = simplifiedError.message;
    errorSouces = simplifiedError.errorSouces
    // statusCode = 400;
    // message = "Zod error"
    // // console.log(error.issues);
    // error.issues.forEach((issues: any) => {
    //   errorSouces.push({
    //     path: issues.path[issues.path.length - 1],
    //     message: issues.message
    //   })
    // })
  }


  // mongoose validationError
  else if (error.name === "ValidationError") {
    const simplifiedError = handelValidationError(error);
    statusCode = simplifiedError.StatusCode;
    errorSouces = simplifiedError.errorSouces;
    message = simplifiedError.message;

    // statusCode = 400;
    // const errors = Object.values(error.errors);
    // errors.forEach((errorObject: any) => errorSouces.push({
    //   path: errorObject.path,
    //   message: errorObject.message
    // }));
    // message = error.message;
  }


  else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  }
  else if (error instanceof Error) {
    statusCode = 500;
    message = error.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSouces,
    error : envVars.NODE_ENV === "development" ? error : null,
    stack: envVars.NODE_ENV === "development" ? error.stack : null,
  });
};
