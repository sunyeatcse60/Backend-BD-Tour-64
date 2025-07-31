/* eslint-disable @typescript-eslint/no-explicit-any */
import { TGenericErrorResponse } from "../interfaces/error.type";

export const handleDuplicteError = (error: any) : TGenericErrorResponse => {
  const dublicte = error.message.match(/"([^"]*)"/);

  return {
    StatusCode: 400,
    message: `${dublicte[1]} already exit`
  }
}
