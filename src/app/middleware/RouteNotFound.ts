// import httpStatus  from 'http-status-codes';
// import { Request, Response } from "express"



// export const routeNotFound = (req : Request, res : Response) => {
//     res.status(httpStatus.NOT_FOUND).json({
//         success : false,
//         message : "Route not found"
//     })
// }



// export default routeNotFound;



import httpStatus from "http-status-codes";
import { Request, Response } from "express";

export const routeNotFound = (req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Route not found",
  });
};

export default routeNotFound;
