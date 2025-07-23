/* eslint-disable @typescript-eslint/no-explicit-any */
// import { JwtPayload } from 'jsonwebtoken';
// import { NextFunction, Request, Response, Router } from "express";
// import { UserControllers } from "./user.controller";
// import { createUserZotSchema } from "./user.validation";
// import { validationRequest } from "../../middleware/validationRequest";
// import { verifyToken } from '../../utils/jwt';
// import { envVars } from '../../config/env';



// const router = Router();

// const checkAuth = (...authRoles : string[]) => async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const accessToken = req.headers.authorization;

//         // if (!accessToken) {
//         //     throw new AppError(403, "No token recieved");
            
//         // }

//         // const varifiedToken = jwt.verify(accessToken as string, "secret");
//         const varifiedToken = verifyToken(accessToken as string, envVars.JWT_ACCESS_SECREAT) as JwtPayload


//         // if (!varifiedToken) {
//         //     throw new AppError(403, "you are not authorised");
//         // }


//         // if ((varifiedToken as JwtPayload).role !== Role.Admin) {

//         if (!authRoles.includes(varifiedToken.Role)) {
//             // throw new Error(403,"You are not permited to view this route");
//             alert("You are not permited to view this route");

//         }
//         console.log(varifiedToken);
//         next()

//     } catch (error) {
//         next(error)

//     }
// }



// router.post("/register", validationRequest(createUserZotSchema), UserControllers.createUser);

// // token varification 

// router.get("/all-users", checkAuth("Admin","Super_Admin") ,UserControllers.getAllUsers);



// export const UserRoutes = router;






import { Router } from "express";
import { UserControllers } from "./user.controller";
import { createUserZotSchema } from "./user.validation";
import { validationRequest } from "../../middleware/validationRequest";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { NextFunction, Request, Response } from "express";

const router = Router();

const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1]; // Bearer token

    if (!accessToken) {
      return res.status(403).json({ message: "No token received" });
    }

    const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET);

    if (!verifiedToken || typeof verifiedToken === "string") {
      return res.status(403).json({ message: "You are not authorized" });
    }

    if (!authRoles.includes(verifiedToken.role)) {
      return res.status(403).json({ message: "You are not permitted to view this route" });
    }

    // Attach user info if needed
    (req as any).user = verifiedToken;

    next();
  } catch (error) {
    next(error);
  }
};

router.post("/register", validationRequest(createUserZotSchema), UserControllers.createUser);

router.get("/all-users", checkAuth("Admin", "Super_Admin"), UserControllers.getAllUsers);

export const UserRoutes = router;
