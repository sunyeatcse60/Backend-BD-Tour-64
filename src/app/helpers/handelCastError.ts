/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose"
import { TGenericErrorResponse } from "../interfaces/error.type"


 export const handleCastError = (error: mongoose.Error.CastError) : TGenericErrorResponse => {
  return {
    StatusCode: 400,
    message: "Invalid mongose Object id. Please provide a valid id"
  }
}
