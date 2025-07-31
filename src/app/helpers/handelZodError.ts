/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenericErrorResponse } from "../interfaces/error.type"

export const handelZodError = (error: any) : TGenericErrorResponse => {
  const errorSouces: TErrorSources[] = []
  error.issues.forEach((issues: any) => {
    errorSouces.push({
      path: issues.path[issues.path.length - 1],
      message: issues.message
    })
  })
  return{
    StatusCode : 400,
    message : "Zod error",
    errorSouces
  }
}
