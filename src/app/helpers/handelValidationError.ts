/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interfaces/error.type";

export const handelValidationError = (error: mongoose.Error.ValidationError) : TGenericErrorResponse => {
  const errorSouces: TErrorSources[] = []

  const errors = Object.values(error.errors);
  errors.forEach((errorObject: any) => errorSouces.push({
    path: errorObject.path,
    message: errorObject.message
  }));
  return {
    StatusCode: 400,
    message: "Validation Error",
    errorSouces
  }


}
