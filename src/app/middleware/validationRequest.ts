// import { NextFunction, Request, Response } from 'express';
// import { AnyZodObject } from "zod"

// export const validationRequest = (ZodSchema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         req.body = await ZodSchema.parseAsync(req.body)
//         next()
//     } catch (error) {
//        next(error)
//     }
// }


import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const validationRequest = (ZodSchema: AnyZodObject) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body = await ZodSchema.parseAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
