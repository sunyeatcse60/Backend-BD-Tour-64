/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";

type asyncHandlear = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export const catchAsyne = (fn: asyncHandlear) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).
    catch((error: any) => {
      console.log(error);
      next(error);
    });
  };
};
